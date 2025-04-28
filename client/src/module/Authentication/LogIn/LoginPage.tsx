import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadSpinner } from '../../shared';
import './loginPage_style.css';
import logIn from '../../API/authentication/logIn';


function LoginForm(): JSX.Element {
    const [cardNumber, setCardNumber] = React.useState('');
    const [loginSpinnerShow, setLoginSpinnerShow] = React.useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (cardNumber.trim() !== '') {
            setLoginSpinnerShow(true);
            logIn(Number(cardNumber)) // Zavolaj funkciu logIn s číslom karty
                .then(response => {
                    if (response === "success") {
                        setLoginSpinnerShow(false);
                        navigate('/fxb/home');
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
