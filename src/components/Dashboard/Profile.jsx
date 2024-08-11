import React from 'react';
import { Paper, Typography, Box, Avatar, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import MessageIcon from '@mui/icons-material/Message';
import Cookies from 'js-cookie';

const Profile = () => {
    const user = JSON.parse(Cookies.get('user'));
    const name=user.name
    // const age=54
    const email=user.email
    const phoneNo=user.phoneNumber

    return (
        <Paper elevation={3} sx={{ p: 2, mb: 3, backgroundColor: '#f5f5f5' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                        src='/default-profile-pic.png'
                        alt={name}
                        sx={{ width: 80, height: 80, mr: 2 }}
                    />
                    <Box>
                        <Typography variant="h6">{name}</Typography>
                        {/* <Typography>Age: {age}</Typography> */}
                        <Typography>E-mail: {email}</Typography>
                        <Typography>Phone No: {phoneNo}</Typography>
                    </Box>
                </Box>
                <Box>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<EditIcon />}
                        sx={{ mr: 1 }}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<MessageIcon />}
                    >
                        Message
                    </Button>
                </Box>
            </Box>
        </Paper>
    )
};

export default Profile;
