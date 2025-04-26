import React from 'react';
import "./listTransaction_style.css";
import { read_Transaction, Transaction_model } from '../../API/transaction';
import Content_app from '../../../App';


function ListTransaction(): JSX.Element {
  const main_Context = React.useContext(Content_app.mainContext);


  React.useEffect(() => {
    read_Transaction().then(data => {
      main_Context.setMainData(data);
    });
  }, []);



  return (
    <div className='transaction_list'>
      {
        main_Context.mainData &&
        main_Context.mainData.map((transaction: Transaction_model, key: number) => (
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
            <div>
              <h3>{transaction.name_event}</h3>
            </div>
          </div>
        ))
      }
    </div>
  );
}


export default ListTransaction;