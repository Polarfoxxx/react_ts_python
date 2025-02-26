import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShowVzByURL } from '../ShowVZbyURL';
import { API_URL } from '../shared';
import { AddTransaction, DedTransaction } from './Transaction';
import { ListTransaction } from './ListTransaction';
import { LogOut } from '../Authentication';
import { authorizationModule } from '../shared/authorizationModule';


function Home(): JSX.Element {
    const navigate = useNavigate();
    const [VZNumber, setCardNumber] = React.useState('');
    const [OPNumber, setOPNumber] = React.useState('');
    const [on_authorization, setOn_authorization] = React.useState(false);


    React.useEffect(() => {
        authoriz_mod();
    }, []);

    async function authoriz_mod() {
        const module = await authorizationModule();
        if (!module) {
            setOn_authorization(false)
            navigate('/fxb/welcome')
        } else {
            setOn_authorization(true);
        }
    };

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
            {
                on_authorization ?
                    (
                        <div>
                            <div>
                                <h1>Home</h1>
                            </div>
                            <div>
                                <LogOut />
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
                    ) :
                    (
                        <div>
                            {/* no login */}
                        </div>
                    )
            }
        </div>
    );
}

export default Home;