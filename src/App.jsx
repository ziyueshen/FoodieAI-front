
import { useState, useEffect, createContext, useContext } from 'react'
import { Layout, Modal } from 'antd';
import Sidebar from './sidebar';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import NewChat from './NewChat';
import History from './History';
import Login from './Login';
import Register from './Register';
import axios from 'axios';
import dotenv from 'dotenv';

const { Sider, Content } = Layout;
export const GlobalContext = createContext();

function App() {

  let apiBaseUrl = 'https://foodieai.onrender.com';
  //'http://localhost:3000';

  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [chats, setChats] = useState([]);
  const showModal = () => {
    setIsModalVisible(true);
  };

  // 获取用户信息
  const fetchUser = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.get(`${apiBaseUrl}/users/user`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });
      // const userData = response.data;
      if (response !== null) {
        setUser(1);
      }
    } catch (error) {
      console.error('Error fetching user data');
    }
  };

  const addMessage = (message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  };

  useEffect(() => {
    // 组件加载时获取用户信息
    fetchUser();
  }, []);

  return (

    <div>
      <GlobalContext.Provider value={apiBaseUrl}>
        <Router>
          <Sider><Sidebar user={user} setUser={setUser} showModal={showModal} chats={chats} setChats={setChats} /></Sider>

          <Routes>
            <Route path="/" element={<Home onAddMessage={addMessage} setQuery={setQuery} />} />
            <Route path="/new-chat" element={
              <NewChat messages={messages} setMessages={setMessages} onAddMessage={addMessage} query={query} setQuery={setQuery} user={user} />
            } />
            <Route path="/history" element={<History />} />
            <Route path="/login" element={<Login user={user} fetchUser={fetchUser} />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <History user={user} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} chats={chats} message={messages} setMessages={setMessages} />
        </Router>
      </GlobalContext.Provider>
    </div>
  )
}

export default App
