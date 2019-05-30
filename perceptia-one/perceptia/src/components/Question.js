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
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import "./quiz.css";

class Question extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            question:"",
            questionType:"",
            questionId:"",
            answerOptions:[],
            selectedAnswer: null,
            tfOptions:["True", "False"],
            counter:"",
            totalNumber:""

        }
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            question:nextProps.question,
            questionType:nextProps.questionType,
            questionId:nextProps.questionId,
            answerOptions:nextProps.answerOptions,
            selectedAnswer: nextProps.selectedAnswer,
            counter:nextProps.counter,
            totalNumber:nextProps.totalNumber
        }
    }

    handleChange(e) {
        console.log("changed")
    }

    handleClick(e) {
        console.log("clicked")
    }

    render() {

        return (

            <ReactCSSTransitionGroup
                className="container"
                component="div"
                transitionName="fade"
                transitionEnterTimeout={800}
                transitionLeaveTimeout={500}
                transitionAppear
                transitionAppearTimeout={500}>
                    <div key={this.state.questionId}>
                        <div className="questionCount">
                            Question <span>{this.state.counter + 1}</span> of <span>{this.state.totalNumber}</span>
                        </div>
                        <h2 className="question">{this.state.question}</h2>
                        <ul className="answerOptions">
                            { // Multiple Choice = 1, True or False = 2
                                this.state.questionType == 1 
                                    ? this.state.answerOptions.map(option => (
                                        <li className="answerOption" key={option}>
                                            <input 
                                                type="radio"
                                                className="radioCustomButton"
                                                name="radioGroup"
                                                checked={this.state.selectedAnswer === option} 
                                                onChange={() => this.handleChange()}
                                                />
                                            <label className="radioCustomLabel">
                                                {option}
                                            </label>
                                        </li>
                                    )) 
                                    : this.state.tfOptions.map(option => (
                                        <li className="answerOption" key={option}>
                                            <input 
                                                type="radio"
                                                className="radioCustomButton"
                                                name="radioGroup"
                                                checked={this.state.selectedAnswer === option}
                                                onChange={() => this.handleChange()}
                                                />
                                            <label className="radioCustomLabel">
                                                {option}
                                            </label>
                                        </li>
                                    ))
                            }
                        </ul>
                        <Button onClick={this.props.onSelectPrevious} variant="contained" color="primary">Previous</Button>
                        <Button onClick={this.props.onSelectNext} variant="contained" color="primary">Next</Button>
                    </div>
            </ReactCSSTransitionGroup>

        )

        // if (this.state.question_type == 1) {
        //     return (
        //         // <MultipleChoice />
        //         <div>
        //             <h2 className="question">{this.state.question}</h2>
        //             <ul className="answerOptions">
        //                 {this.state.answerOptions.map(option => (
        //                     <li className="answerOption">
        //                         <input 
        //                             type="radio"
        //                             className="radioCustunButton"
        //                             name="radioGroup"
        //                             checked={false}
        //                             onChange={this.props.onAnswerSelected}
        //                         />
        //                         <label className="radioCustomLabel">{option}</label>
        //                     </li>
        //                 ))}
        //             </ul>
        //         </div>
        //     )
        // } else { // q_type == 2
        //     return (
        //         // <TrueOrFalse />
        //         <div>
        //             <h2 className="question">{this.state.question}</h2>
        //             <ul className="answerOptions">
                      
        //                 <li className="answerOption">
        //                     <input 
        //                         type="radio"
        //                         className="radioCustunButton"
        //                         name="radioGroup"
        //                         checked={false}
        //                         onChange={this.props.onAnswerSelected}
        //                     />
        //                     <label className="radioCustomLabel">True</label>
        //                 </li>
        //                 <li className="answerOption">
        //                     <input 
        //                         type="radio"
        //                         className="radioCustunButton"
        //                         name="radioGroup"
        //                         checked={false}
        //                         onChange={this.props.onAnswerSelected}
        //                     />
        //                     <label className="radioCustomLabel">False</label>
        //                 </li>

        //             </ul>
        //         </div>
        //     )
        // }
    }

}

export default Question;