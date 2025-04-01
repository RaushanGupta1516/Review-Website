import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import reducers from './reducers';
import App from './App';
<<<<<<< HEAD
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import StoreContextProvider from "./StoreContext";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
		<StoreContextProvider>
			<App />
		</StoreContextProvider>
	</BrowserRouter>
  </React.StrictMode>
=======
import './index.css';

// Create a theme instance
const theme = createTheme();

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
>>>>>>> b73f876a94c93ca105c15dc455f6b8aa4918cdba
);
