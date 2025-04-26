import React from "react";
import { NewTransaction } from "./NewTransaction";
import "./transaction_style.css";
import { OptionsTransaction } from "../OptionsTransaction";



function Transaction(): JSX.Element {
    const o_pTransaction = new OptionsTransaction("New options"); // Create an instance of OptionsTransaction with a label


    return (
        <div className="content_transaction">
            <div className="header_transaction">
                <h1>Transaction</h1>
            </div>
            <div className="body_transaction_block">
                <NewTransaction />
            </div>
            <div className="footer_transaction">
                <div>
                    <div>
                        {o_pTransaction.renderFormField()}
                    </div>
                </div>
                <div>
                    <div>

                    </div>
                </div>
            </div>
        </div>
    )
};

export default Transaction;