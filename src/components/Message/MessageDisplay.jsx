import React, {useState} from 'react';
import { Box, Typography, Avatar, Paper, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import SendIcon from "@mui/icons-material/Send";

const sampleMessages = [
  { id: 1, text: "I'm a student. For a few days I’m feeling unsecured myself.", time: "11:21 am", sender: "self" },
  { id: 2, text: "Can you please explain to me?", time: "11:22 am", sender: "other" },
  { id: 3, text: "Can I send you a voice message or call right now?", time: "11:23 am", sender: "self" },
  { id: 4, text: "Sorry, You can send me voice only right now. For call you need to book an appointment.", time: "11:25 am", sender: "other" },
  // { id: 5, text: "Can I send you a voice message or call right now?", time: "11:23 am", sender: "self" }
];

const ChatContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  padding: '14px',
  height: '60vh',
  flexGrow: 1, overflow: "auto", p: 2 
});

const MessageContainer = styled(Box)(({ sender }) => ({
  display: 'flex',
  justifyContent: sender === 'self' ? 'flex-end' : 'flex-start',
  alignItems: 'flex-end',
  gap: '10px',
}));

const MessageBubble = styled(Paper)(({ theme, sender }) => ({
  maxWidth: '60%',
  padding: '10px 15px',
  borderRadius: '15px',
  backgroundColor: sender === 'self' ? theme?.palette?.primary?.light || '#e3f2fd' : theme?.palette?.grey || '#f5f5f5',
  color: sender === 'self' ? theme?.palette?.primary?.contrastText || '#000' : theme?.palette?.text?.primary || '#000',
}));

function formatTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  let strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

const MessageDisplay = () => {

  const [text, setText] = useState('');
  const [id, setId] = useState(6);
  const [messages, setMessages] = useState(sampleMessages);
  const [error, setError] = useState('');
  
  const d = new Date();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    messages.push({
      id, 
      text, 
      time : formatTime(d), 
      sender : 'self'
    });
    setMessages(messages);
    setId(id + 1);
    setText('');
  }
  
  return(
  <Box>

    <ChatContainer>
      {messages.map((message) => (
        <MessageContainer key={message.id} sender={message.sender}>
          {message.sender === 'other' && <Avatar alt="Other User" src="/path/to/avatar.jpg" />}
          <MessageBubble sender={message.sender}>
            <Typography variant="body1">{message.text}</Typography>
            <Typography variant="caption" color="textSecondary">{message.time}</Typography>
          </MessageBubble>
          {message.sender === 'self' && <Avatar alt="Self User" src="/path/to/your-avatar.jpg" />}
        </MessageContainer>
      ))}
    </ChatContainer>
    <Box display="flex" p={2} borderTop="1px solid #ccc">
      <TextField
        value={text}
        onChange={(e) => setText(e.target.value)}
        // onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        placeholder="Type a message..."
        fullWidth
      />
      <Button
        onClick={handleSendMessage}
        variant="contained"
        color="primary"
        endIcon={<SendIcon />}
      >
        Send
      </Button>
    </Box>
  </Box>
)};

export default MessageDisplay;
