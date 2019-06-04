import React from 'react';
import {Button, CircularProgress} from '@material-ui/core';
import { NavigateNext } from "@material-ui/icons";

import './quiz.css';


class Study extends React.Component {

  render() {
    if(this.props.quiz==null && this.props.summary==null) {
      return (<CircularProgress/>);
    }

    return (
      <div>
        <h2 className="question">{(this.props.summary[0].text)}</h2>
        <Button onClick={this.props.onNext}>Next <NavigateNext/></Button>
      </div>
    );
  }
}

export default Study;