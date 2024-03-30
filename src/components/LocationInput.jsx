// LocationInput.js
import React, { useState, createContext, useContext } from 'react';
import { Input, Button } from 'antd';
import axios from 'axios';
import { GlobalContext } from '../App';
const LocationInput = ({ onAddMessage, query, setQuery }) => {
    const apiBaseUrl = useContext(GlobalContext);
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [optional, setOptional] = useState('');

    const handleStateChange = (e) => {
        setState(e.target.value);
    };

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const handleOptionalChange = (e) => {
        setOptional(e.target.value);
    };

    const handleSearch = () => {
        const location = `${state}, ${city}, ${optional}`;
        setQuery(location);
        onAddMessage({ sender: 'other', text: 'Summarizing information about ' + location + ', may take a few seconds...'});
        axios.post(`${apiBaseUrl}/api/sum`, { location })
            .then(response => {
                onAddMessage({ sender: 'other', text: response.data });
            })
            .catch(error => {
                console.error('Error:', error);
                onAddMessage({ sender: 'other', text: "😞Insufficient data, please try searching for other cuisines." });
            });
    };

    return (

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: '20px', width: '100%' }}>
            <Input placeholder="Enter state" value={state} onChange={handleStateChange} style={{ marginRight: '8px' }} />
            <Input placeholder="Enter city" value={city} onChange={handleCityChange} style={{ marginRight: '8px' }} />
            <Input placeholder="eg.Downtown Chinese restaurants" value={optional} onChange={handleOptionalChange} style={{ marginRight: '8px' }} />
            <Button type="primary" onClick={handleSearch}>
                Explore🔍
            </Button>
        </div>

    );
};

export default LocationInput;

