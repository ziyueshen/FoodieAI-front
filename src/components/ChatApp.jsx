import React, { useRef, useState, useEffect, createContext, useContext } from 'react';
import { Layout } from 'antd';

import '../style/ChatApp.css';
import axios from 'axios';
import LocationInput from './LocationInput';
import { GlobalContext } from '../App';

const ChatComponent = ({ messages, onAddMessage, setMessages, query, setQuery }) => {
    const apiBaseUrl = useContext(GlobalContext);
    const [title] = useState("🌮 Find your favorite cuisine! 🍜");
    const [text, setText] = useState("");
    const sendMessage = () => {
        if (text.trim() !== "") {
            onAddMessage({ sender: 'me', text: text });
            axios.post(`${apiBaseUrl}/api/ask`, { text })
                .then(response => {
                    onAddMessage({ sender: 'other', text: response.data });
                });
            setText("");
        }
    };

    const handleClickBubble = (text) => {
        onAddMessage({ sender: 'me', text: text });
        axios.post(`${apiBaseUrl}/api/ask`, { text })
            .then(response => {
                onAddMessage({ sender: 'other', text: response.data });
            });
        setText("");
    }
    const chatBoxRef = useRef(null);
    useEffect(() => {
        // scroll to the bottom of the chat box
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }, [messages]);
    return (

        <div style={{ width: '100%', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: '100%', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 0 10px #ccc' }}>
                <div style={{ lineHeight: '50px', borderBottom: '1px solid #ccc' }}>
                    {title}
                </div>
                <div
                    ref={chatBoxRef}
                    style={{ height: '500px', overflow: 'auto', position: 'relative', padding: '5px' }}>
                    {messages.map((message, index) => (
                        <div key={index} className={message.sender === 'other' ? 'message-left' : 'message-right'}>
                            <div className={message.sender === 'other' ? 'bubble-blue' : 'bubble-green'}>
                                {message.text.split('\n').map((line, i) => (
                                    <span key={i}>
                                        {line}
                                        <br />
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}

                </div>
                <div style={{ height: '170px', borderTop: '1px solid #ccc', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ position: 'absolute', bottom: 0, display: 'flex', justifyContent: 'flex-start', width: '80%', padding: '10px' }}>
                        {messages.length > 0 && (
                            <>
                                <div style={{ textAlign: 'right', padding: '10px', fontSize: '0.7em' }}>
                                    <button type="button" onClick={() => handleClickBubble('Which do you recommend?')} style={{ backgroundColor: '#E0E0E0' }}>Which do you recommend?</button>
                                </div>
                                <div style={{ textAlign: 'right', padding: '10px', fontSize: '0.7em' }}>
                                    <button type="button" onClick={() => handleClickBubble('More about customer reviews')} style={{ backgroundColor: '#E0E0E0' }}>More about customer reviews</button>
                                </div>
                                <div style={{ textAlign: 'right', padding: '10px', fontSize: '0.7em' }}>
                                    <button type="button" onClick={() => handleClickBubble('How\'s the service?')} style={{ backgroundColor: '#E0E0E0' }}>How's the service?</button>
                                </div>
                                <div style={{ textAlign: 'right', padding: '10px', fontSize: '0.7em' }}>
                                    <button type="button" onClick={() => handleClickBubble('Other choices?')} style={{ backgroundColor: '#E0E0E0' }}>Other choices?</button>
                                </div>
                            </>
                        )}
                    </div>
                    <textarea
                        style={{ flex: '1', height: '100%', padding: '20px', border: 'none', outline: 'none' }}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <div style={{ textAlign: 'right', padding: '10px' }}>
                        <button type="button" onClick={sendMessage}>Send🛫</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatComponent;