import React from "react";
import "./mainValue_style.css";
import { current_ballance } from "../../API/transaction";
import Content_app from "../../../App";

function MainValue(): JSX.Element {
     const [show_ballance, setShow_ballance] = React.useState(0);
     const main_Context = React.useContext(Content_app.mainContext);

    React.useEffect(() => {
        current_ballanc_API();
    }, [main_Context.mainData]);

    async function current_ballanc_API() {
       current_ballance().then((response) => {
            setShow_ballance(response.current_balance);
        })
    }



    return (
        <div className="main-value">
            <div className="main-value__header">
                <h1 className="main-value__title">
                    My ballance
                </h1>
            </div>
            <div className="main-value__content">
                <div className="main-value__value">
                    <h2>
                        {show_ballance}
                    </h2>
                </div>
                <span>
                    €
                </span>
            </div>
            <div className="main-value__footer">
                <div>
                    <h1>
                        Last month:
                    </h1>
                </div>
                <div>
                    <h1>
                        + 2,5%
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default MainValue;