import React from 'react';
import "./listTransaction_style.css";
import { read_Transaction, Transaction_model } from '../../API/transaction';

function ListTransaction(): JSX.Element {
  const [transactions, setTransactions] = React.useState<Array<Transaction_model>>([]);

  React.useEffect(() => {
    read_Transaction().then(data => {
      setTransactions(data);
    });
  }, []);


  return (
    <div className='transaction_list'>
      {
        transactions.map((transaction: Transaction_model, key: number) => (
          <div
            key={key}
            className='transaction_item'>
            <div>
              <h3>{transaction.create_time}</h3>
            </div>
            <div>
              <h3>{transaction.type_trns}</h3>
            </div>
            <div>
              <h3>{transaction.value_trns}</h3>
            </div>
          </div>
        ))
      }
    </div>
  );
}


export default ListTransaction;