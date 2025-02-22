import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShowVzByURL } from '../ShowVZbyURL';
import { API_URL } from '../shared';
import { AddTransaction, DedTransaction } from './Transaction';
import { ListTransaction } from './ListTransaction';

function Home(): JSX.Element {
    const navigate = useNavigate();
    const [VZNumber, setCardNumber] = React.useState('');
    const [OPNumber, setOPNumber] = React.useState('');

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const current_URL = `/fxb/home?dialogVZ=${encodeURIComponent(VZNumber)}&dialogOP=${encodeURIComponent(OPNumber)}`
        navigate(current_URL)
        fetch(`${API_URL}${current_URL}`, {
            method: 'GET'
        }).then(response => response.json()) // Prečítaj JSON telo odpovede
            .then(data => {
                console.log(data);
            })
            .catch(error => console.error("Error:", error));
    }

    return (
        <div>
            <div>
                <h1>Home</h1>
            </div>
            <div>
                <div>
                    <div>
                        <AddTransaction />
                    </div>
                    <div>
                        <DedTransaction />
                    </div>
                </div>
                <div>
                    <ListTransaction />
                </div>
            </div>
        </div>
    );
}

export default Home;