import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShowVzByURL } from '../ShowVZbyURL';
import { API_URL } from '../shared';
import { Transaction } from './Transaction';
import { ListTransaction } from './ListTransaction';
import { LogOut } from '../Authentication';
import { authorizationModule } from '../shared/authorizationModule';
import "./home_style.css";
import { MainValue } from './MainValue';


function Home(): JSX.Element {
    const navigate = useNavigate();
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

 /*    const handleSubmit = async (event: any) => {
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
 */

    return (
        <div className='content_app'>
            {
                on_authorization ?
                    (
                        <div className='content_finances'>
                            <div className='header_content'>
                                <div className='header_logout'>
                                    <LogOut />
                                </div>
                                <div className='header_tittle'>
                                    <div className='header_welcome_block'>
                                        <h1>
                                            Welcome back Michal
                                        </h1>
                                    </div>
                                </div>
                                <div className='little_header_finances'>
                                    <h3>
                                        This is your finances report
                                    </h3>
                                </div>
                            </div>
                            <div className='body_finances'>
                                <div className='body_transaction'>
                                    <div className='body_mainBlock'>
                                        <MainValue />
                                    </div>
                                    <div className='body_firstBlock'>
                                        <Transaction /> 
                                    </div>
                                    <div className='body_secondBlock'>
                                        <ListTransaction />
                                    </div>
                                </div>
                                <div className='body_InfoBlock'>
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

