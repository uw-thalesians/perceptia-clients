import React, { Component } from 'react';

import './App.css';

import Header from './components/Header'

import Footer from './components/Footer'

import SignIn from './components/SignIn'

import SignUp from './components/SignUp'

import QuizInfo from './components/QuizInfo'

import NavBar from './components/NavBar'

class App extends Component {
  render() {
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <p>Built for the {process.env.NODE_ENV} environment</p>
      //     <p>Web server host: {process.env.REACT_APP_WEB_SERVER_HOST}</p>
      //     <p>Api server host: {process.env.REACT_APP_API_SERVER_HOST}</p>
      //   </header>
      // </div>
      <QuizInfo />
      
    );
  }
}

export default App;
