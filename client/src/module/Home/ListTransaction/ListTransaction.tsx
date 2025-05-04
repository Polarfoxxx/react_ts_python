import React from 'react';
import "./listTransaction_style.css";
import { read_Transaction, Transaction_model } from '../../API/transaction';
import Content_app from '../../../App';
import { ItemInTransactionList } from './ItemInTransactionList';


function ListTransaction(): JSX.Element {
  const main_Context = React.useContext(Content_app.mainContext);



  return (
    <div className='transaction_list'>
      {
        main_Context.mainData &&
        main_Context.mainData.map((transaction: Transaction_model, key: number) => (
          <div
            key={key}
            className='transaction_item'>
            <ItemInTransactionList oneTransaction = {transaction}/>
          </div>
        ))
      }
    </div>
  );
}


export default ListTransaction;