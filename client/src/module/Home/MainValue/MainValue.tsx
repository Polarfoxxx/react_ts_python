import React from "react";
import "./mainValue_style.css";

function MainValue(): JSX.Element {



    return (
        <div className="main-value">
            <div className="main-value__header">
                <h1 className="main-value__title">
                    Value Available
                </h1>
            </div>
            <div className="main-value__content">
                <h2 className="main-value__amount">
                    5000
                </h2>
            </div>
        </div>
    );
}

export default MainValue;