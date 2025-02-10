import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LoginForm } from '../LoginPage';

const WelcomePage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const showLoginForm = React.useMemo(() => {
        return searchParams.get("dialog") === "cardNumber";
    }, [searchParams]);

    return (
        <div>
            {
                showLoginForm ?
                    <LoginForm />
                    :
                    <div>
                        <h1>Vitajte!</h1>
                        <button onClick={() => navigate('/drm/welcome?dialog=cardNumber')}>
                            Prihlásiť sa
                        </button>
                    </div>
            }
        </div>
    );
};

export default WelcomePage;
