import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


const LoginForm = () => {
    const [cardNumber, setCardNumber] = React.useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const apiUrl_public = process.env.REACT_APP_API_URL_PUBLIC;
    const apiUrl_localle = process.env.REACT_APP_API_URL_LOCAL;
    const backEnd_URL = `${apiUrl_localle}`;
    

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (cardNumber.trim() !== '') {
            fetch(`${backEnd_URL}/drm/welcome?dialog=${encodeURIComponent(cardNumber)}`, {
                method: 'GET'
            }).then(response => response.json()) // Prečítaj JSON telo odpovede
                .then(data => {
                    console.log(data);
                    if (data.findNumber === "true") {
                        navigate('/drm/home');
                    } else {
                        alert('Číslo sa nenašlo.');
                    }
                })
                .catch(error => console.error("Error:", error));
        } else {
            alert('Prosím, zadajte číslo.');
        }
    };

    return (
        <div>
            <div>
                <h2>Zadajte svoje číslo</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Číslo:
                        <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                        />
                    </label>
                    <button type="submit">Odoslať</button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
