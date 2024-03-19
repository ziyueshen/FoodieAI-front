import React, { useState, useEffect, createContext, useContext } from 'react';
import ChatApp from './ChatApp'
import LocationInput from './LocationInput'
import axios from 'axios';
import { Card, Button } from 'antd';
import { GlobalContext } from './App';

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
                        }, 2000); // 2秒后隐藏保存成功消息
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
                <div style={{ width: '25%', height: '230px', display: 'flex', marginTop: '85px' }}>
                    <Card style={{ backgroundColor: '#F3E9FF', textAlign: 'left', borderRadius: '10px', boxShadow: '0 0 10px #ccc' }}>
                        <ul style={{ padding: 0, margin: 0, textAlign: 'left' }}>
                            <li>I am Foodie AI. Enter the cuisine you're interested in into the input box</li>
                            <li>I will retrieve real-time information from Google Maps and provide feedback</li>
                            <li>You can further inquire about specific details you're interested in</li>
                        </ul>
                        <div style={{ marginTop: '15px' }}>
                            <Button type="primary" onClick={handleSave}>Save chat</Button>
                            <span style={{ marginRight: '10px' }}></span>
                            <Button type="default" onClick={handleClear}>Clear chat</Button>
                        </div>
                    </Card>
                </div>
                <div style={{ width: '75%', display: 'flex', flexDirection: 'column' }}>
                    <LocationInput onAddMessage={onAddMessage} query={query} setQuery={setQuery} />
                    <ChatApp messages={messages} onAddMessage={onAddMessage} setMessages={setMessages} query={query} setQuery={setQuery} />
                </div>
            </div>
            {showSavedMessage && (
                <div className="saved-message">Saved successfully</div>
            )}
        </div>
    );
};

export default NewChat;