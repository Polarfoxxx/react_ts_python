import axios from "axios";
import { API_URL } from "../../../shared";

async function current_ballance() {
    const current_URL = `/fxb/current_ballance`

    try {
        const response = await axios.get(`${API_URL}${current_URL}`, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

        return response.data;
        
    } catch (error) {
        console.error("Chyb")
        return []
    }
};

export default current_ballance;