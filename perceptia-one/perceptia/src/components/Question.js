import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import QuizInfo from './QuizInfo';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./quiz.css"

class Question extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            question:"",
            question_type:"",
            questionId:"",
            answerOptions:[]

        }
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            question:nextProps.question,
            question_type:nextProps.question_type,
            questionId:nextProps.questionId,
            answerOptions:nextProps.answerOptions
        }
    }

    render() {

        if (this.state.question_type == 1) {
            return (
                // <MultipleChoice />
                <div>
                    <h2 className="question">{this.state.question}</h2>
                    <ul className="answerOptions">
                        {this.state.answerOptions.map(option => (
                            <li className="answerOption">
                                <input 
                                    type="radio"
                                    className="radioCustunButton"
                                    name="radioGroup"
                                    checked={false}
                                    onChange={this.props.onAnswerSelected}
                                />
                                <label className="radioCustomLabel">{option}</label>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        } else { // q_type == 2
            return (
                // <TrueOrFalse />
                <div>
                    <h2 className="question">{this.state.question}</h2>
                    <ul className="answerOptions">
                      
                        <li className="answerOption">
                            <input 
                                type="radio"
                                className="radioCustunButton"
                                name="radioGroup"
                                checked={false}
                                onChange={this.props.onAnswerSelected}
                            />
                            <label className="radioCustomLabel">True</label>
                        </li>
                        <li className="answerOption">
                            <input 
                                type="radio"
                                className="radioCustunButton"
                                name="radioGroup"
                                checked={false}
                                onChange={this.props.onAnswerSelected}
                            />
                            <label className="radioCustomLabel">False</label>
                        </li>

                    </ul>
                </div>
            )
        }
    }

}

export default Question;