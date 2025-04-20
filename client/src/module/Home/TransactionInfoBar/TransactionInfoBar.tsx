import React from "react";
import { GraphOne, GraphTwo } from "./";
import "./transactionInfoBar_style.css";

function TransactionInfoBar() {
    return (
        <div className="transaction-info-bar">
            <div className="transaction-info-bar__one">
                <GraphOne />
            </div>
            <div className="transaction-info-bar__two">
                <GraphTwo />
            </div>
            <div className="transaction-info-bar__two">
                freebar
            </div>
            <div className="transaction-info-bar__two">
                freebar
            </div>
        </div>
    );
}

export default TransactionInfoBar;
