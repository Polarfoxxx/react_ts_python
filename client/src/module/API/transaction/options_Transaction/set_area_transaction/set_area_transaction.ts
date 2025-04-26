import axios from "axios";
import { API_URL } from "../../../../shared";

async function setAreaTransaction(props: number) {
    const current_URL = "fxb/context/transaction_show_area";

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

export default setAreaTransaction;
