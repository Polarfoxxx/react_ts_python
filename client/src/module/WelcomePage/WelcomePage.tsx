import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LoginForm } from '../Authentication/LogIn';
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
        <div className='welcome_page'>
                {
                    showLoginForm ?
                        <div className='welcomePage_form'>
                             <LoginForm />
                        </div>
                        :
                        <div className='welcomePage_form'>
                            <div>
                                <h1>Hello!</h1>
                            </div>
                            <div>
                                <h3>Please login by cardNumber</h3>
                            </div>
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
