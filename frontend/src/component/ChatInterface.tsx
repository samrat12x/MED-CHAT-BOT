import React, { useState, useRef, useCallback, useEffect } from 'react';
import { TextField, Button, Paper, Box } from '@mui/material';
import axios from 'axios';

import Message from './Message';
import './chat.css'; // Import the CSS file

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    { text: 'Hello , Welcome to SwasthCare. Tell us your problem?', isNew: false },
  ]);

  const [DoctorCard,setDoctorCard]=useState<any>([]);

  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null); // Explicitly specifying the type of ref



  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sendMessage = useCallback(async () => {
    if (inputValue.trim()) {
      const newMessage = { text: inputValue, isNew: true };
      setMessages(prevMessages => [...prevMessages, newMessage]);

      try {
        const response = await axios.post(
          'http://127.0.0.1:5000/',
          { user_prompt: inputValue },
          {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*', // Add any other headers you need
            },
          }
        );


 // Parse the JSON response
 try{
 const responseData = JSON.parse(response.data.response);
 console.log(responseData)
         // Check if the response is doctor information
      if (responseData && responseData.name && responseData.title) {
//card logic


        // const botResponse = { text:  response.data.response+'card invoked', isNew: false }; // You might want to format this data appropriately
        // setMessages(prevMessages => [...prevMessages, botResponse]);
        const cardComponents: JSX.Element[] = [];
        for (const key in responseData) {
          if (Object.prototype.hasOwnProperty.call(responseData, key)) {
            const value = responseData[key];
            const cardComponent = (
              <div key={key}>
                <h2>{key}</h2>
                <p>{JSON.stringify(value)}</p> {/* You can format the value as needed */}
              </div>
            );
            cardComponents.push(cardComponent);
          }
        }

        setDoctorCard(cardComponents);

      }}catch(error){

      

        //simple message response
        const botResponse = { text: response.data.response , isNew: false };
        setMessages(prevMessages => [...prevMessages, botResponse]);
      
      }
        
  



      } catch (error) {
        console.error('Error sending message:', error);
        const errorMessage = { text: 'Error: Unable to get response from the server.', isNew: false };
        setMessages(prevMessages => [...prevMessages, errorMessage]);
      }

      setInputValue('');
    }
  }, [inputValue]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Paper elevation={3} className="chat-interface">
      <Box
        className="messages"
        sx={{
          '& .MuiPaper-root': {
            bgcolor: 'transparent',
          },
          '& .MuiTypography-root': {
            fontWeight: 'bolder',
          },
        }}
      >
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} isNew={msg.isNew} />
        ))}

<div>
    {/* Render doctorCards here */}
    {DoctorCard.map((card: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, index: React.Key | null | undefined) => (
      <div key={index}>{card}</div>
    ))}
  </div>

        <div ref={messagesEndRef} />
      </Box>
      <Box className="input-container">
        <TextField
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          label="Type your message..."
          variant="outlined"
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={sendMessage} style={{ marginLeft: '10px' }}>
          Send
        </Button>
      </Box>
    </Paper>
  );
}
