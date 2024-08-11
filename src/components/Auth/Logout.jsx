// src/components/Logout.js
import React from 'react';
import { Button } from '@mui/material';
import { useNavigate} from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import Cookies from 'js-cookie';

const Logout = () => {
    const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Sign out the user from Firebase
      await signOut(auth);

      // Clear the user data from cookies
      Cookies.remove('user');

      // Redirect to the login page or home page
      navigate('/login');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  }
  handleLogout();
};

export default Logout;
