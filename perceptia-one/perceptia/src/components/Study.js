import React from 'react';

import './quiz.css';

class Study extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      quiz: null,
      summary: null
    };
  }

  render() {
    return (
      <div>
        <div className="App-header">
          <h2>{this.props.location.state.selectedQuiz} quiz</h2>
        </div>
        <p>{this.props.location.state.quizSummary}</p>
      </div>

    );

  }
}

export default Study;