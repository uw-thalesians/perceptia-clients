import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import './quiz.css'

class Study extends React.Component {

    /*constructor(props) {
        super(props);

    }*/



    render() {
        //console.log("render this",this, this.props.quiz==null, this.props.summary==null);
        if(this.props.quiz==null && this.props.summary==null) {
            return (
                    <span>Loading...</span>
                    );
        }

        return (
            <div>
                <p>{this.props.summary[0].text}</p>
                <button onClick={this.props.onNext}>Next</button>
            </div>

        )

    }
}

export default Study;