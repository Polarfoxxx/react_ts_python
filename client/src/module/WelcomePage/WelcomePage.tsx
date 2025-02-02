import { useNavigate } from "react-router-dom";


function WelcomePage(): JSX.Element {
    const navigate = useNavigate();

    const handleLoginPage = () => {
        navigate('/drm/login?dialog=cardNumber');
    };

    return (
        <div>
            <h1>Welcome to the React Starter Kit</h1>
            <p>
                This is a boilerplate project for building React applications with
                TypeScript, Webpack, and Babel.
            </p>
            <button onClick={handleLoginPage}>Login page</button>
        </div>
    );
}

export default WelcomePage;