import { API_URL } from "../../../shared";
import { Transaction_model } from "./type";


async function read_Transaction(): Promise<Array<Transaction_model>> {
  const current_URL = `/fxb/load_all_transactions`
  return fetch(`${API_URL}${current_URL}`, {
    method: 'GET'
  }).then(response => response.json()) // Prečítaj JSON telo odpovede
    .then(data => { return data })
    .catch(error => {
      console.error("Error:", error);
      return [];
    });
}

export default read_Transaction;