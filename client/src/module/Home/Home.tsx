import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShowVzByURL } from '../ShowVZbyURL';

function Home(): JSX.Element {
    const navigate = useNavigate();
    const [VZNumber, setCardNumber] = React.useState('');
    const [OPNumber, setOPNumber] = React.useState('');


    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const current_URL = `/drm/home?dialogVZ=${encodeURIComponent(VZNumber)}&dialogOP=${encodeURIComponent(OPNumber)}`
        navigate(current_URL)
        fetch(`http://localhost:8000${current_URL}`, {
            method: 'GET'
        }).then(response => response.json()) // Prečítaj JSON telo odpovede
            .then(data => {
                console.log(data);
            })
            .catch(error => console.error("Error:", error));
    }

    return (
        <div>
            <h1>Home</h1>
            <h2>Zadajte čisli zakazky</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        Číslo VZ:
                        <input
                            type="text"
                            value={VZNumber}
                            onChange={(e) => setCardNumber(e.target.value)}/>
                    </label>
                    <br />
                    <br />
                    <label>
                        Číslo OP:
                        <input
                            type="text"
                            value={OPNumber}
                            onChange={(e) => setOPNumber(e.target.value)}/>
                    </label>
                    <br />
                    <br />
                    <button type="submit">Odoslať</button>
                </form>
            </div>
            <div>
                <ShowVzByURL />
            </div>
        </div>
    );
}

export default Home;