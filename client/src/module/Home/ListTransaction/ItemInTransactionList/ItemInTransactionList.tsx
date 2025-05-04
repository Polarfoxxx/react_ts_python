import React from 'react';
import { Transaction_model } from '../../../API';

interface PropsForItemInTransactionList {
  oneTransaction: Transaction_model;
}


function ItemInTransactionList(props: PropsForItemInTransactionList): JSX.Element {

  const transaction = React.useMemo(() => {
    return props.oneTransaction
  }, [props.oneTransaction])

  const handleDeleteTransacton = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('delete transaction', transaction.id);
    
  }, []);



  return (
    <div className="transaction_item">
      <div>
        {
          transaction.create_time
        }
      </div>
      <div>
        {
          transaction.type_trns
        }
      </div>
      <div>

      </div>
      <div>

      </div>
      <div>
        <button
          onClick={(e) => handleDeleteTransacton(e)}>
          delete
        </button>
      </div>
    </div>
  );
}

export default ItemInTransactionList;