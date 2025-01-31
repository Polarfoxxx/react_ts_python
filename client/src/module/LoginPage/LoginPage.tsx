import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginForm = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [submittedNumber, setSubmittedNumber] = useState<any>(null);
    const [responseData, setResponseData] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const cardNumberParam = params.get('cardNumber');
        if (cardNumberParam) {
            setSubmittedNumber(cardNumberParam);
            console.log('Odosielam na backend:', cardNumberParam);
            
            // Odoslanie na backend
            fetch(`http://localhost:8000/api/overit?cardNumber=${encodeURIComponent(cardNumberParam)}`)
                .then((response) => response.json())
                .then((data) => {
                    setResponseData(data);
                })
                .catch((error) => {
                    console.error('Chyba:', error);
                });
        }
    }, [location.search]);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (cardNumber.trim() !== '') {
            navigate(`/drm/login?cardNumber=${encodeURIComponent(cardNumber)}`);
        } else {
            alert('Prosím, zadajte číslo.');
        }
    };

    return (
        <div>
            {submittedNumber ? (
                <div>
                    <h2>Vaše číslo bolo odoslané:</h2>
                    <p>{submittedNumber}</p>
                    {responseData ? (
                        <div>
                            <h3>Odpoveď z backendu:</h3>
                            <pre>{JSON.stringify(responseData, null, 2)}</pre>
                        </div>
                    ) : (
                        <p>Načítavam údaje z backendu...</p>
                    )}
                </div>
            ) : (
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
            )}
        </div>
    );
};

export default LoginForm;
