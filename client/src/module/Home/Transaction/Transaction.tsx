import { AddTransaction } from "./AddTransaction";
import { DedTransaction } from "./DedTransaction";

function Transaction(): JSX.Element {
    return (
        <div>
            <div>
                <h1>Transaction</h1>
            </div>
            <div>
                <AddTransaction />
            </div>
            <div>
                <DedTransaction />
            </div>
        </div>
    )
};

export default Transaction;