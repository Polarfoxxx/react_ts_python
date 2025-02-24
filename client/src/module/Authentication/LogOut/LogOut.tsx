import React from "react"
import { useNavigate } from "react-router-dom";

function LogOut(): JSX.Element {
    const navigate = useNavigate();



    const handleClickLogOut = () => {
        logOutAPI()
    };

    const logOutAPI = async (): Promise<void> => {
        try {
            const response = await fetch('/cookie/logout', {
                method: 'POST',
                credentials: 'include', // Needed if using cookies for authentication
            });
    
            if (!response.ok) {
                throw new Error('Logout request failed');
            }
    
            // Clear authentication data
            localStorage.removeItem('authToken');
            sessionStorage.removeItem('authToken');
            document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
            console.log('User logged out successfully');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };
    


    return (
        <div>
            <button onClick={handleClickLogOut}>
                Logout
            </button>
        </div>
    )
};

export default LogOut;