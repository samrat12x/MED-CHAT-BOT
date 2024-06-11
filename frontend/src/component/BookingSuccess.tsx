import React from 'react';
import styled from 'styled-components';

// Styled-components for the styles
const Body = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f8ff;
  font-family: 'Arial', sans-serif;
`;

const MessageContainer = styled.div`
  text-align: center;
`;

const Message = styled.h1`
  font-size: 3em;
  font-weight: bold;
  color: #2c3e50;
  background: linear-gradient(90deg, rgba(255, 136, 0, 1) 0%, rgba(255, 191, 0, 1) 50%, rgba(255, 255, 0, 1) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const BookingSuccess: React.FC = () => {
  return (
    <Body>
      <MessageContainer>
        <Message>BOOKING SUCCESSFUL</Message>
      </MessageContainer>
    </Body>
  );
};

export default BookingSuccess;
