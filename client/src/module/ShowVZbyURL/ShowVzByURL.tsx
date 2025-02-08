import React from "react";
import { useSearchParams, useLocation } from "react-router-dom";


function ShowVzByURL() {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [VZNumber, setVZNumber] = React.useState('');

    React.useEffect(() => {
        const category = searchParams.get('dialogVZ');
        setVZNumber(category || '');
    }, [searchParams]);

    return (
        <div>
            {location.key ? (
                <div>
                    <h1>{VZNumber}</h1>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ShowVzByURL;