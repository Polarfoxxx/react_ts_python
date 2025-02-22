import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LoginForm } from '../LoginPage';
import './style.css';

function WelcomePage(): JSX.Element {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const showLoginForm = React.useMemo(() => {
        return searchParams.get("dialog") === "cardNumber";
    }, [searchParams]);

    const handleSendLoginPage = () => {
        navigate('/fxb/welcome?dialog=cardNumber');
    };

    return (
        <div>
            {
                showLoginForm ?
                    <LoginForm />
                    :
                    <div className='welcomePage'>
                        <h1>Hello!</h1>
                        <h3>Please login by cardNumber</h3>
                        <button 
                        className="btn-primary"
                        onClick={handleSendLoginPage}>
                            Log in
                        </button>
                    </div>
            }
        </div>
    );
};

export default WelcomePage;
