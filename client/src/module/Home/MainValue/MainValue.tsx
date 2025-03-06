import React from "react";
import "./mainValue_style.css";

function MainValue(): JSX.Element {



    return (
        <div className="main-value">
            <div className="main-value__header">
                <h1 className="main-value__title">
                    My ballance
                </h1>
            </div>
            <div className="main-value__content">
                <h2>
                    5000
                </h2>
                <h2 className="main-little__value">
                    .60
                </h2>
                <span>
                    euro
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