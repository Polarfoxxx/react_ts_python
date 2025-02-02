import React from 'react';

function Home(): JSX.Element {

    const [VZNumber, setCardNumber] = React.useState('');

    const handleSubmit = async (event: any) => {
        event.preventDefault();
    }

    return (
        <div>
            <h1>Home</h1>
            <h2>Zadajte čisli zakazky</h2>
           
        </div>
    );
}

export default Home;