import React from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../shared';
import { LoadSpinner } from '../shared';


const LoginForm = () => {
    const [cardNumber, setCardNumber] = React.useState('');
    const [loginSpinnerShow, setLoginSpinnerShow] = React.useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (cardNumber.trim() !== '') {
            setLoginSpinnerShow(true);
            fetch(`${API_URL}/drm/welcome?dialog=${encodeURIComponent(cardNumber)}`, {
                method: 'GET'
            }).then(response => response.json()) // Prečítaj JSON telo odpovede
                .then(data => {
                    console.log(data);
                    if (data.findNumber === "true") {
                        setLoginSpinnerShow(false);
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
            {
                loginSpinnerShow &&
                <LoadSpinner load_Spinner={loginSpinnerShow} />
            }

        </div>
    );
};

export default LoginForm;
