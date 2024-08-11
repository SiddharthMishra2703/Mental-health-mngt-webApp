import React from 'react';
import { Box, Toolbar , Paper} from '@mui/material';
import MessageList from './MessageList';
import MessageDisplay from './MessageDisplay';

const Messages = () => (
  <Box sx={{ display: 'flex'}}>
    {/* <Toolbar /> */}
    <Box sx={{ width: 300 }}>
        <Paper>

      <MessageList />
        </Paper>
    </Box>
    <Paper>

    <MessageDisplay />
    </Paper>
  </Box>
);

export default Messages;
