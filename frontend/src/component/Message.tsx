// src/components/Message.tsx
import React from 'react';
import { Paper, Typography } from '@mui/material';

interface MessageProps {
  text: string;
  isNew: boolean; // Add a new prop to indicate if the message is new
  isBot:boolean;
}

const Message: React.FC<MessageProps> = ({ text, isNew , isBot }) => {
  return (
    <Paper
      elevation={1}
      className={isNew ? 'new-message' : ''}
      style={{ margin: '10px 0', padding: '10px', wordBreak: 'break-word' }}
    >

      <Typography variant="body1"> <div   className={isBot ? 'BotMsg' : 'UserMsg'}> {isBot ? 'Bot :' : 'User:'}  {text} </div></Typography>
    </Paper>
  );
};

export default React.memo(Message);
