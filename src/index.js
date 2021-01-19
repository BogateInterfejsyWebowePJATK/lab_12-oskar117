import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Form from './components/Form';
import SecondForm from './components/SecondForm';
import LoginForm from './components/LoginForm';
import reportWebVitals from './reportWebVitals';
import Page from './components/Page';
import validCredentials from "./data/credentials.json";

ReactDOM.render(
  <React.StrictMode>
    <Page userData={validCredentials}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
