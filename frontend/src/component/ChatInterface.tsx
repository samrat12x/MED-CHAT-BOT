import React, { useState, useRef, useCallback, useEffect } from 'react';
import { TextField, Button, Paper, Box } from '@mui/material';
import axios from 'axios';
import DoctorCard from './DoctorCard'
import Message from './Message';
import './chat.css'; // Import the CSS file


export default function ChatInterface() {
  const [messages, setMessages] = useState([
    { text: 'Hello , Welcome to SwasthCare. Tell us your problem?', isNew: false , isBot:true},
  ]);

  const [DoctorCards,setDoctorCards]=useState<any>([]);

  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null); // Explicitly specifying the type of ref



  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sendMessage = useCallback(async () => {
    if (inputValue.trim()) {
      const newMessage = { text: inputValue, isNew: true , isBot: false };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setDoctorCards(" ") 
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
        for (const key in responseData.name) {
          if (Object.prototype.hasOwnProperty.call(responseData.name, key)) {
            const doctorId = key;
            const doctorName = responseData.name[doctorId];
            const doctorTitle = responseData.title[doctorId];
            const doctorPhone = responseData.phone[doctorId];
            const doctorProfilePic = responseData.profile_pic[doctorId];
            const doctorExperience = responseData.experience[doctorId];
            const doctorStars = responseData.stars[doctorId];
            const doctorPatientsHandled = responseData.patients_handled[doctorId];
            const doctorLocation = responseData.location[doctorId];
            const doctorGender = responseData.gender[doctorId];
        
            const cardComponent = (
              <DoctorCard
                key={doctorId}
                name={doctorName}
                title={doctorTitle}
                phone={doctorPhone}
                profile_pic={doctorProfilePic}
                experience={doctorExperience}
                stars={doctorStars}
                patients_handled={doctorPatientsHandled}
                location={doctorLocation}
                gender={doctorGender}
              />
            );
            cardComponents.push(cardComponent);
          }
        }
        
        setDoctorCards(cardComponents);

        
      }}catch(error){

      

        //simple message response
        const botResponse = { text: response.data.response , isNew: false , isBot: true};
        setMessages(prevMessages => [...prevMessages, botResponse]);
      
      }
        
  



      } catch (error) {
        console.error('Error sending message:', error);
        const errorMessage = { text: 'Error: Unable to get response from the server.', isNew: false ,isBot: true};
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
          <Message key={index} text={msg.text} isNew={msg.isNew} isBot={msg.isBot} />
        ))}

<div className='Doctorcards'>{DoctorCards}</div>

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
