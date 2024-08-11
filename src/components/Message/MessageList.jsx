import React from 'react';
import { Tabs, Tab, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Divider, Box } from '@mui/material';
import { useState } from 'react';

const messages = [
  { id: 1, name: 'Savannah Nguyen', message: 'Hey How are you...', time: '1 min ago', avatar: '/path/to/avatar1.jpg' },
  { id: 2, name: 'Jane Cooper', message: 'Hey How are you...', time: '20 min ago', avatar: '/path/to/avatar2.jpg' },
  // Add more messages as needed
  { id: 3, name: 'Deppak Grovar', message: 'Hey How are you...', time: '1 min ago', avatar: '/path/to/avatar1.jpg' },
  { id: 4, name: 'Ravi Sharma', message: 'Hey How are you...', time: '20 min ago', avatar: '/path/to/avatar2.jpg' },
  // { id: 5, name: 'Savannah Nguyen', message: 'Hey Dr. How are you...', time: '1 min ago', avatar: '/path/to/avatar1.jpg' },
  // { id: 6, name: 'Jane Cooper', message: 'Hey Dr. How are you...', time: '20 min ago', avatar: '/path/to/avatar2.jpg' },
  // { id: 7, name: 'Savannah Nguyen', message: 'Hey Dr. How are you...', time: '1 min ago', avatar: '/path/to/avatar1.jpg' },
  // { id: 8, name: 'Jane Cooper', message: 'Hey Dr. How are you...', time: '20 min ago', avatar: '/path/to/avatar2.jpg' },
];

const MessageList = () => {
  const [tab, setTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box sx={{height: '75vh', flexGrow: 1, overflow: "auto", p: 2 }}>
      <Tabs value={tab} onChange={handleTabChange} variant="fullWidth">
        <Tab label="Chats" />
        <Tab label="Doctors" />
      </Tabs>
      <List>
        {messages.map((message) => (
          <React.Fragment key={message.id}>
            <ListItem alignItems="flex-start" button>
              <ListItemAvatar>
                <Avatar alt={message.name} src={message.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={message.name}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="textPrimary">
                      {message.message}
                    </Typography>
                    <Typography component="span" variant="body2" color="textSecondary">
                      {' — ' + message.time}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default MessageList;
