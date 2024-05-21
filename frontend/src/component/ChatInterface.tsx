import React, { useState, useRef, useCallback, useEffect } from 'react';
import { TextField, Button, Paper, Box } from '@mui/material';
import axios from 'axios';

import Message from './Message';
import './chat.css'; // Import the CSS file

export default function ChatInterface() {
  const [messages, setMessages] = useState<{ text: string; isNew: boolean }[]>([
    { text: 'Hello , Welcome to SwasthCare .Tell us your problem?', isNew: false },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sendMessage = useCallback(async () => {
    if (inputValue.trim()) {
      const newMessage = { text: inputValue, isNew: true };
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      try {
        const response = await axios.post('http://127.0.0.1:5000/', {
          user_prompt: inputValue,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', // Add any other headers you need
          },
        });
        const botResponse = { text: response.data.response, isNew: false };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      } catch (error) {
        console.error('Error sending message:', error);
        // Optionally, you can add an error message to the chat
        const errorMessage = { text: 'Error: Unable to get response from the server.', isNew: false };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
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
        <div ref={messagesEndRef} />
      </Box>
      <Box className="input-container">
        <TextField
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
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
