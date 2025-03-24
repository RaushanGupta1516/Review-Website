import React, {useState, useEffect} from 'react';
import { Container, AppBar, Typography, Grid,Grow, Box } from '@mui/material';
import ss from './images/ss.png';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import useStyles from './style';
import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts'; 

function App() {
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
  );
}

export default App;
