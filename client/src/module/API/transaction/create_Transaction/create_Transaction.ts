import { API_URL } from "../../../shared";
import axios from "axios";
import { Type_for_new_transaction } from "./types";


async function create_Transaction(props: Type_for_new_transaction) {
  const new_trans = props
  const current_URL = `/fxb/create_new_transactions`

  axios.post(`${API_URL}${current_URL}`, {
    new_trans
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  export default create_Transaction;