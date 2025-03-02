import React from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../shared';
import { LoadSpinner } from '../../shared';
import './loginPage_style.css';


function LoginForm(): JSX.Element {
    const [cardNumber, setCardNumber] = React.useState('');
    const [loginSpinnerShow, setLoginSpinnerShow] = React.useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (cardNumber.trim() !== '') {
            setLoginSpinnerShow(true);
            fetch(`${API_URL}/fxb/welcome?dialog=${encodeURIComponent(cardNumber)}`, {
                method: "GET",
                credentials: "include",  // Povolenie cookies
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(response => response.json()) // Prečítaj JSON telo odpovede
                .then(data => {
                    console.log(data);
                    if (data.findNumber === "true") {
                        setLoginSpinnerShow(false);
                        navigate('/fxb/home');
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
        <div className='loginForm'>
            <div className='loginForm__content'>
                <h2>
                    You write the cardNumber
                    </h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)} />
                    <button type="submit">Send</button>
                </form>
            </div>
            <div className='login_loadSpinner'>
                {
                    loginSpinnerShow &&
                    <LoadSpinner load_Spinner={loginSpinnerShow} />
                }
            </div>
        </div>
    );
};

export default LoginForm;
