import React, { Component } from 'react';

import './App.css';

// import Header from './components/Header';
//
// import Footer from './components/Footer';
//
// import SignIn from './components/SignIn';
//
// import SignUp from './components/SignUp';
//
// import QuizInfo from './components/QuizInfo';
//
// import NavBar from './components/NavBar';
//
// import constants from './components/constants';

import QuizGallery from './components/QuizGallery';

import QuestionView from './components/QuestionView';

// import Question from './components/Question';

import Study from './components/Study';

import { BrowserRouter as Router, Route,/* Link,*/ Switch } from "react-router-dom";

class App extends Component {

  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <p>Built for the {process.env.NODE_ENV} environment</p>
          <p>Web server host: {process.env.REACT_APP_WEB_SERVER_HOST}</p>
          <p>API REF: {constants.api.url}</p>
        </header> */}

        <Router>
        <Switch>
          <Route exact path='/' component={QuizGallery}/>
          <Route path='/quiz' component={QuestionView}/>
          <Route path='/study' component={Study}/>
        </Switch>
        </Router>

      </div>
    );
  }
}

export default App;
