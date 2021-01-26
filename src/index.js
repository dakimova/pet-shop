import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';

import './index.css';
import App from './App';
import authReducer from './store/reducers/auth';
import petsReducer from './store/reducers/pets';
import { watchAuth, watchPets } from './store/sagas/index';
import reportWebVitals from './reportWebVitals';

const composeEnhancers = process.env.NODE_ENV === 'development'
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  : null;

const rootReducer = combineReducers({
  auth: authReducer,
  pets: petsReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk, sagaMiddleware)
));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchPets);

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#be9c91',
      main: '#8d6e63',
      dark: '#5f4339',
      contrastText: '#fff',
    },
    secondary: {
      light: '#b085f5',
      main: '#7e57c2',
      dark: '#4d2c91',
      contrastText: '#fff',
    },
  }
});

// <React.StrictMode></React.StrictMode>
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </CssBaseline>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
