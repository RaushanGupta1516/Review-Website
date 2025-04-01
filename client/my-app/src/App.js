<<<<<<< HEAD

import './App.css';
=======
import React, {useState, useEffect} from 'react';
import { Container, AppBar, Typography, Grid,Grow, Box } from '@mui/material';
import ss from './images/ss.png';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import useStyles from './style';
import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts'; 
>>>>>>> b73f876a94c93ca105c15dc455f6b8aa4918cdba


import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { useState } from "react";
import Login from "./components/Login";
import PostReviewPage from "./pages/PostReviewPage";
import ReviewDetailPage from "./pages/ReviewDetailPage";
import Nav from "./components/Nav";
import { ToastContainer } from "react-toastify";
import { StoreContext } from "./StoreContext";
import { useContext } from "react";
import { toast } from "react-toastify";
function App() {
<<<<<<< HEAD
    const { token } = useContext(StoreContext);
  function ProtectedRoute({ element }) {
    if (!token) {
      toast.error("You are not Logged in. Please login to continue.");
      return <Navigate to="/"  />;
    }
  
    return element;
  }

  const [showLogin, setshowLogin] = useState(false);
  return (
    <div className="appbox">
      <ToastContainer />
      {showLogin?<Login setshowLogin={setshowLogin} />:<></>}
      <Nav setshowLogin={setshowLogin} />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/post-review" element={<ProtectedRoute element={<PostReviewPage />} />} />
                <Route path="/review/:id" element={<ReviewDetailPage />} />
            </Routes>
    </div>
=======
  const [currentId, setCurrentId] = useState(0);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  
  return (
   <Container maxWidth="lg">
      <AppBar position="static" color="inherit" className={classes.appBar}>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography className={classes.heading} variant="h2">
            Stay-Story
          </Typography>
          <img className={classes.image} src={ss} alt="stay story" height="60" />
        </Box>
      </AppBar>
        <Grow in>
          <Container>
            <Grid container justify="space-between" alignItems="stretch" spacing={3} color='white'>
              <Grid item xs={12} sm={7} >
                <Posts setCurrentId={setCurrentId}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Form currentId={currentId} setCurrentId={setCurrentId}/>
                </Grid>
            </Grid>
          </Container>
          
        </Grow>

   </Container>
>>>>>>> b73f876a94c93ca105c15dc455f6b8aa4918cdba
  );
}

export default App;
