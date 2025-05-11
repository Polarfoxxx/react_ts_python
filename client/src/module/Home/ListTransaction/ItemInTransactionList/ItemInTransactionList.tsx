import React from 'react';
import { Transaction_model } from '../../../API';
import { delete_Transaction } from '../../../API/transaction';
import Transaction from './../../Transaction/Transaction';

interface PropsForItemInTransactionList {
  oneTransaction: Transaction_model;
}

function ItemInTransactionList({ oneTransaction }: PropsForItemInTransactionList): JSX.Element {
  
  const transaction = React.useMemo(() => {
    return oneTransaction;
  }, [oneTransaction]);

  const handleDeleteTransaction = React.useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>, transaction: Transaction_model) => {
      e.preventDefault();
      console.log('delete transaction', transaction.id);
      try {
        await delete_Transaction(transaction.id);
        // Prípadne volanie parent callbacku na refresh zoznamu
      } catch (error) {
        console.error('Failed to delete transaction:', error);
      }
    },
    []
  );

  return (
    <div className="transaction_item">
      <div>{transaction.create_time}</div>
      <div>{transaction.type_trns}</div>
      {/* Tu môžeš doplniť ďalšie polia ako napr. sumu, popis atď. */}
      <div>
        <button onClick={(e) => handleDeleteTransaction(e, transaction)}>
          delete
        </button>
      </div>
    </div>
  );
}

export default ItemInTransactionList;
