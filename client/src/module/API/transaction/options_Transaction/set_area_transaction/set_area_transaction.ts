import axios from "axios";
import { API_URL } from "../../../../shared";

async function setAreaTransaction(props: number): Promise<any> {
    const current_URL = "/fxb/context/transaction_show_area";
    const data = {
        area: props,
        type: "transaction_area",
    }
    try {
        const response = await axios.post(`${API_URL}${current_URL}`, data, {
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
}

export default setAreaTransaction;
