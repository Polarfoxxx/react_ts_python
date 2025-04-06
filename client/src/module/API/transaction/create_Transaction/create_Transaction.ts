import { API_URL } from "../../../shared";
import axios from "axios";
import { Type_for_new_transaction } from "./types";

async function create_Transaction(props: Type_for_new_transaction) {
  const current_URL = "/fxb/create_new_transactions";
  console.log("Odosielam dáta:", props);

  try {
    const response = await axios.post(`${API_URL}${current_URL}`, props, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Úspešná odpoveď:", response.data);
    return response.data;
  } catch (error) {
    console.error("Chyb")
  }
}

export default create_Transaction;
