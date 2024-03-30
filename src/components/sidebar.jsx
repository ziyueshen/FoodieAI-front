
import React, { useState, useEffect, createContext, useContext } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { GlobalContext } from '../App';

const Sidebar = ({ user, setUser, showModal, chats, setChats }) => {
  
  const apiBaseUrl = useContext(GlobalContext);
  const handleLogout = async () => {
    console.log(`${apiBaseUrl}/users/logout`);
    try {
      await axios.get(`${apiBaseUrl}/users/logout`);
      console.log('After logout request');
      localStorage.removeItem('authToken');
      setUser(null); // clear the user state
    } catch (error) {
      console.error('Error logging out', error);
    }
  };
  const handleHistoryQuery = async () => {
    if (!user) {
      alert('Please log in first!');
    } else {
      const authToken = localStorage.getItem('authToken');
      axios.get(`${apiBaseUrl}/chats/history`,
        {
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        }).then(response => {
          const extractedChats = response.data.map(chat => {
            return {
              query: chat.query,
              messages: chat.messages
            };
          });
          setChats(extractedChats);
        }).catch(error => {
          console.error('Error fetching user data');
        })
        showModal();
    }
    ;
  };

  return (
    <div style={{
      width: '10%',
      position: 'fixed',
      left: 0,
      top: 0,
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)' // add shadow
    }}>
      <Menu mode="vertical" theme="light" style={{ backgroundColor: 'transparent' }}>
        <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/new-chat">Chat</Link></Menu.Item>
        {user ? (
          <Menu.Item key="3" onClick={handleLogout}>Log out</Menu.Item>
        ) : (
          <Menu.Item key="3"><Link to="/login">Log in</Link></Menu.Item>
        )}
        <Menu.Item key="4" onClick={() => {  handleHistoryQuery(); }}>History</Menu.Item>
      </Menu>

    </div>
  );
};

export default Sidebar;
