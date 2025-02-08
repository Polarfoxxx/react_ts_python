import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginForm = () => {
    const [cardNumber, setCardNumber] = React.useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (cardNumber.trim() !== '') {
            fetch(`http://localhost:8000/drm/welcome?dialog=${encodeURIComponent(cardNumber)}`, {
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
