import React from 'react';
import ReactDOM from 'react-dom/client'; 
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';  
import reducers from './reducers';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const store = createStore(reducers, compose(applyMiddleware(thunk)));
const theme = createTheme();

const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(
  
    <Provider store={store}>
      <ThemeProvider theme={theme}>
      <App />
      </ThemeProvider>
    </Provider>,
    // document.getElementById('root')
  
);

reportWebVitals();
