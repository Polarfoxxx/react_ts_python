import { NewTransaction } from "./NewTransaction";
import "./transaction_style.css";


function Transaction(): JSX.Element {
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