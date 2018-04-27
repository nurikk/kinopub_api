import reset from 'reset-css';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import ReactTV from 'react-tv'
ReactTV.render((
  <BrowserRouter>
    <App/>
  </BrowserRouter>
), document.getElementById('root'));