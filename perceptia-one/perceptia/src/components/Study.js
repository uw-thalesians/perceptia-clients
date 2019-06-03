import React from 'react';

import './quiz.css';
import { NavigateNext } from "@material-ui/icons";
import {Button, CircularProgress} from '@material-ui/core';


class Study extends React.Component {

    /*constructor(props) {
        super(props);

    }*/



    render() {
        //console.log("render this",this, this.props.quiz==null, this.props.summary==null);
        if(this.props.quiz==null && this.props.summary==null) {
            return (<CircularProgress/>);
        }

        return (
            <div>
                <p>{this.props.summary[0].text}</p>
                <Button onClick={this.props.onNext}>Next <NavigateNext/></Button>
            </div>

    );

  }
}

export default Study;