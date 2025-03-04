import React from "react"
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../shared";
import "./logOut_style.css";

function LogOut(): JSX.Element {
    const navigate = useNavigate();



    const handleClickLogOut = () => {
        logOutAPI();
        navigate('/fxb/welcome');
    };

    const logOutAPI = async (): Promise<void> => {
        try {
            fetch(`${API_URL}/cookie/delete`, {
                method: "GET",
                credentials: "include",  // Povolenie cookies
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(response => response.json()) // Prečítaj JSON telo odpovede
                .then(data => {
                    console.log(data);
                })
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };



    return (
        <div className="logout">
            <button onClick={handleClickLogOut}>
                Logout
            </button>
        </div>
    )
};

export default LogOut;