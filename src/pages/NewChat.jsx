import React, { useState, useEffect, createContext, useContext } from 'react';
import ChatApp from '../components/ChatApp'
import LocationInput from '../components/LocationInput'
import axios from 'axios';
import { Card, Button } from 'antd';
import { GlobalContext } from '../App';

const NewChat = ({ messages, setMessages, onAddMessage, query, setQuery, user }) => {
    const apiBaseUrl = useContext(GlobalContext);
    const [showSavedMessage, setShowSavedMessage] = useState(false);
    const handleClear = () => {
        setMessages([]);
        setQuery('');
    };
    const handleSave = () => {
        if (!user) {
            alert('Please log in first!');
        } else {
            const authToken = localStorage.getItem('authToken');
            const config = {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                },
            };
            if (messages.length > 0 && query !== "") {
                const timestamp = Date.now();
                axios.post(`${apiBaseUrl}/chats/messages`, { query, messages, timestamp }, config)
                    .then(response => {
                        console.log(response.data.success);
                        setShowSavedMessage(response.data.success);
                        setTimeout(() => {
                            setShowSavedMessage(false);
                        }, 2000); // in 2 seconds, hide the message
                    })
                    .catch(error => {
                        console.error('Error sending messages:', error);
                    });
            }

        }
    };

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ flex: '0 0 20%', height: '35%', display: 'flex', marginTop: '15px' }}>
                    <Card
                        style={{
                            backgroundColor: '#F3E9FF',
                            textAlign: 'left',
                            borderRadius: '5px',
                            boxShadow: '0 0 10px #ccc',
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: '200px', 
                        }}
                    >
                        <div style={{ padding: '2px' }}> 
                        💡 Enter the state, city, and type of food you're interested in, then click "Explore🔍"
                        </div>
                        <div style={{ marginTop: 'auto', padding: '20px' }}> 
                            <Button type="primary" onClick={handleSave}>Save chat</Button>
                        </div>
                    </Card>
                </div>
                <div style={{ flex: '1 1 80%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{height: '10%'}}>
                    <LocationInput onAddMessage={onAddMessage} query={query} setQuery={setQuery} />
                    </div>
                    <div style={{height: '90%'}}>
                    <ChatApp messages={messages} onAddMessage={onAddMessage} setMessages={setMessages} query={query} setQuery={setQuery} />
                    </div>
                </div>
            </div>
            {showSavedMessage && (
                <div className="saved-message">Saved successfully</div>
            )}
        </div>
    );
};

export default NewChat;