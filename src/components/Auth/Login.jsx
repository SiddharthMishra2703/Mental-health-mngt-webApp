import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {Avatar, Button, TextField, Link, Grid, Box, Typography, Container, FormControlLabel, Checkbox} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Cookies from 'js-cookie';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [asDoctor, setAsDoctor] = useState(false);
  const [error, setError] = useState('');

  const firestore = getFirestore();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    let db = 'users'
    try {
      if(asDoctor){
        if(email.slice(-11) != '@doctor.com'){
          setError('Invalid email for doctor')
          return;
        }
        db = 'doctors' 
      }
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Retrieve user data from Firestore
      const userDoc = await getDoc(doc(firestore, db, user.uid));
      const userData = userDoc.data();

      // Store user data in cookies
      Cookies.set('user', JSON.stringify({
        uid: user.uid,
        name: userData.name,
        phoneNumber: userData.phoneNumber,
        email: userData.email
      }), { expires: 7 }); // Expires in 7 days

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSignIn} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox 
              value="asDoctor" 
              color="primary" 
              onChange={(e) => setAsDoctor(e.target.checked)}
            />}
            label="As a Doctor"
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}