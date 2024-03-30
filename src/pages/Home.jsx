import { Card, Collapse } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GlobalContext } from '../App';
import React, { useState, useEffect, createContext, useContext } from 'react';
const Home = ({ onAddMessage, setQuery }) => {
  const apiBaseUrl = useContext(GlobalContext);
  const navigate = useNavigate();
  const intro = ['🍽️ Let the AI assistant find the best restaurant for you!', '🛠️ How does it work?', '💡 Is it different from normal GenAI?'];
  const intro_ans = [
    [
      'It integrates real-time restaurant reviews and other information from Google Maps;',
      'Allow AI to extract key points for you from the clutter of information;',
      'Gather specific answers based on the questions you care about.'
    ],
    ['Enter the information you want to inquire about, such as state, city, and a specific type of cuisine;',
      'Wait for AI to retrieve information and summarize it for you;',
      'You can further inquire about specific details you care about.'],
    ['Its information comes from real-time data from Google Maps;',
      'GenAI\'s information comes from publicly available sources from some time ago;',
      'GenAI does not have real-time data or customer reviews.']
  ];
  const questions = ['Any Italian food recommended?', 'How is this restaurant?', 'Where can I find delicious tacos?'];
  const choices = ['MA, Boston, Cambridge Italian food', 'NY, New York, Shanghai 21', 'CA, Los Angeles, Santa Monica tacos'];
  const handleCardClick = (index) => {
    const location = choices[index];
    setQuery(location);
    onAddMessage({ sender: 'other', text: 'Summarizing information about ' + location + ', may take a few seconds...' });
    axios.post(`${apiBaseUrl}/api/sum`, { location })
      .then(response => {
        onAddMessage({ sender: 'other', text: response.data });
      })
      .catch(error => {
        onAddMessage({ sender: 'other', text: "😞Insufficient data, please try searching for other cuisines." });
        console.error('Error:', error);
      });
    navigate('/new-chat');

  };
  return (
    <div>
      <h1>Foodie AI</h1>
      <h3></h3>
      <h3>👇Click on any card to discover top restaurants in the area</h3>
      <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
  {Array.from({ length: 3 }, (_, index) => (
    <Card
      key={index}
      title={questions[index]}
      style={{
        minWidth: 'calc(90% / 3)', 
        borderRadius: '5px',
        boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.1)',
        padding: '10px'
      }}
    >
      
      <button onClick={() => handleCardClick(index)}>
        <span>{choices[index]}</span>
      </button>
    </Card>
  ))}
</div>
      <Collapse>
        {intro.map((question, index) => (
          <Collapse.Panel
            header={question}
            key={index.toString()}
            style={{ backgroundColor: '#F3E9FF', textAlign: 'left', marginBottom: '10px', borderRadius: '5px' }}
          >
            <ul>
              {intro_ans[index].map((ans, idx) => (
                <li key={idx}>{ans}</li>
              ))}
            </ul>
          </Collapse.Panel>

        ))}
      </Collapse>
      
    </div>
  );
}

export default Home;