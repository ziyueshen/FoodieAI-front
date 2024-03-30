
import { useState, useEffect, createContext, useContext } from 'react'
import { Layout, Modal } from 'antd';
import Sidebar from './components/sidebar';
import './style/App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NewChat from './pages/NewChat';
import History from './components/History';
import Login from './pages/Login';
import Register from './pages/Register';
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
    // fetch user data when the app starts
    fetchUser();
  }, []);

  return (

    <div>
      <GlobalContext.Provider value={apiBaseUrl}>
        <Router>
          <div style={{ display: 'flex' }}>
            <Sider style={{ flex: '0 0 auto' }}>
              <Sidebar user={user} setUser={setUser} showModal={showModal} chats={chats} setChats={setChats} />
            </Sider>

            <div style={{ flex: '1 1 auto' }}>
              <Routes>
                <Route path="/" element={<Home onAddMessage={addMessage} setQuery={setQuery} />} />
                <Route path="/new-chat" element={
                  <NewChat messages={messages} setMessages={setMessages} onAddMessage={addMessage} query={query} setQuery={setQuery} user={user} />
                } />
                <Route path="/history" element={<History />} />
                <Route path="/login" element={<Login user={user} fetchUser={fetchUser} />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </div>
          </div>
          <History user={user} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} chats={chats} message={messages} setMessages={setMessages} />
        </Router>
      </GlobalContext.Provider>
    </div>
  )
}

export default App
