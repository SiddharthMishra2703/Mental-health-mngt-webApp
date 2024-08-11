import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home/Home';
import Messages from './components/Message/Messages';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ArticleList from './components/Article/ArticleList';
// import ArticleDetails from './components/Article/ArticleDetails';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Logout from './components/Auth/Logout';
import { onAuthStateChanged} from 'firebase/auth';
import { auth } from './firebase';



const App = () => {
  const [loggedIn, setLoggedIN] = useState(false);

  useEffect( () => {
    onAuthStateChanged(auth, user => {
      if(user) {
        setLoggedIN(true);
      } else{
        setLoggedIN(false);
      }
    })
  }, [])

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <Header />
        <Sidebar loggedIn={loggedIn} />
        <Box component="main" sx={{ flexGrow: 1, p: 2, mt: 8}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<ArticleList />} />
            {/* <Route path="/articles/:id" element={<ArticleDetails />} /> */}
            {
              loggedIn ? (
                <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/logout" element={<Logout />} />
                </>
              ) : (
                <>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                </>
              )
            }
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
