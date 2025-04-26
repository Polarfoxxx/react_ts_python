import { API_URL } from "../../../shared";
import axios from "axios";
import { Transaction_model } from "./types";

async function create_Transaction(props: Transaction_model) {
  const current_URL = "/fxb/create_new_transactions";
  console.log("create_Transaction", props);
  
  try {
    const response = await axios.post(`${API_URL}${current_URL}`, props, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    console.log("Úspešná odpoveď:", response.data);
    return response.data;
  } catch (error) {
    console.error("Chyb")
  }
}

export default create_Transaction;
