import { API_URL } from "../../../shared";


async function create_Transaction(props:any) {
  const current_URL = `/fxb/create_new_transactions`
  return fetch(`${API_URL}${current_URL}`, {
    method: 'POST'
  }).then(response => response.json()) // Prečítaj JSON telo odpovede
    .then(data => { return data })
    .catch(error => {
      console.error("Error:", error);
      return [];
    });
}

export default create_Transaction;