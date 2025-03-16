import React from 'react';
import { API_URL } from '../../shared';

function ListTransaction(): JSX.Element {

  React.useEffect(() => {
    loadAllTransactions();
  }, []);

  async function loadAllTransactions() {
    const current_URL = `/fxb/load_all_transactions`
    fetch(`${API_URL}${current_URL}`, {
      method: 'GET'
    }).then(response => response.json()) // Prečítaj JSON telo odpovede
      .then(data => {
        console.log(data);
      })
      .catch(error => console.error("Error:", error));
  }



  return (
    <div>
      <h1>Transactions</h1>
      <ul>
      </ul>
    </div>
  );
}

export default ListTransaction;