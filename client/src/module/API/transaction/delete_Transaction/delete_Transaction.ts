import axios from "axios";
import { API_URL } from "../../../shared";

async function delete_Transaction(props: string | undefined): Promise<any> {
    const current_URL = "/fxb/context/transaction_delete";
    const data = {
        id: props,
    }

    try {
        const response = await axios.delete(`${API_URL}${current_URL}`, {
            data: data,
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });


        console.log("Úspešná odpoveď:", response);
        return response;
    } catch (error) {
        console.error("Chyb")
    }
};

export default delete_Transaction;