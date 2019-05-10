import React, { Component } from 'react';

import './App.css';

import Header from './components/Header'

import Footer from './components/Footer'

import SignIn from './components/SignIn'

import SignUp from './components/SignUp'

import QuizInfo from './components/QuizInfo'

import NavBar from './components/NavBar'

import constants from './components/constants'

import QuizGallery from './components/QuizGallery'

import QuestionView from './components/QuestionView'

import Question from './components/Question'


class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <p>Built for the {process.env.NODE_ENV} environment</p>
          <p>Web server host: {process.env.REACT_APP_WEB_SERVER_HOST}</p>
          <p>API REF: {constants.api.url}</p>
        </header> */}
        {/* <NavBar />
        <QuizGallery />
        <Footer /> */}

        <QuestionView />

      </div>
    );
  }
}

export default App;
