import React from "react";
import { NewTransaction } from "./NewTransaction";
import "./transaction_style.css";
import { OptionsTransaction } from "../OptionsTransaction";



function Transaction(): JSX.Element {
    const OP_TRANSACTION = new OptionsTransaction("New Transaction"); // Create an instance of OptionsTransaction with a label
    const [show_transaction, setShow_transaction] = React.useState(false); // State to control the visibility of the transaction component

    return (
        <div className="content_transaction">
            <div className="header_transaction">
                <h1>Transaction</h1>
            </div>
            <div className="body_transaction_block">
                <NewTransaction />
            </div>
            <div className="footer_transaction">
                free block
            </div>
        </div>
    )
};

export default Transaction;