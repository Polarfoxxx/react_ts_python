import axios from "axios";
import { API_URL } from "../../shared";

async function logIn(cardNumber: number): Promise<string> {
    const current_URL = `/fxb/welcome?dialog=${encodeURIComponent(cardNumber)}`;

    try {
        const response = await axios.get(`${API_URL}${current_URL}`, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

        console.log("Úspešná odpoveď:", response.data);
        if (response.data.findNumber === "true") {
            return "success";
        } else {
            return "error";
        }
    } catch (error) {
        console.error("Chyb")
        return "error"
    }
};

export default logIn
