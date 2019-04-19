import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Built for the {process.env.NODE_ENV} environment</p>
          <p>Web server host: {process.env.REACT_APP_WEB_SERVER_HOST}</p>
          <p>Api server host: {process.env.REACT_APP_API_SERVER_HOST}</p>
        </header>
      </div>
    );
  }
}

export default App;
