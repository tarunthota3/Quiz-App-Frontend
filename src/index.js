import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './index.css';
import App from './App';
import Qanda from './questionAnswer/questionAnswer.js';
import CorrectAnswers from './questionAnswer/correctAnswer/correctAnswer.js';
import AdminHomePage from './adminHomePage/adminHomePage.js';


ReactDOM.render(
  <Router>
    <div>
      <Route exact path='/' component={App} />
      <Route path='/qanda' component={Qanda} />
      <Route path='/adminHomePage' component={AdminHomePage} />
      <Route path='/correctAnswers' component={CorrectAnswers} />


    </div>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
