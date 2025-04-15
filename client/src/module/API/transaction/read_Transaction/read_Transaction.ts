import { API_URL } from "../../../shared";
import { Transaction_model } from "./type";
import axios from "axios";


async function read_Transaction(): Promise<Array<Transaction_model>> {
  const current_URL = `/fxb/load_all_transactions`

  try {
    const response = await axios.get(`${API_URL}${current_URL}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    console.log("Úspešná odpoveď:", response.data);
    return response.data;
  } catch (error) {
    console.error("Chyb")
    return [] 
  }
}

export default read_Transaction;