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
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import QuizInfo from './QuizInfo';
import Question from './Question';
import constants from './constants';
import Results from './Results'
import './quiz.css';


class QuestionView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: [], // All questions in a given quiz (in random order)
            question: null, // Current question being displayed
            questionId: null, // ID of the current question
            questionType: null, //1: Multiple Choice, 2: True or False
            answerOptions: [], // Possible answers to the question
            selectedAnswer: null, // Current answer being selected
            answers: {}, // User selected answers
            counter: 0, // Keep track of which question is being displayed
            totalNumber: null, // Keep track of the total number of questions
            completed: false,

        }
        this.setNextQuestion = this.setNextQuestion.bind(this)
        this.setPreviousQuestion = this.setPreviousQuestion.bind(this)
        this.handleAnswerSelected = this.handleAnswerSelected.bind(this)
    }

    componentDidMount() {

        const { selectedQuiz } = this.props.location.state

        fetch(`${constants.api.url}/api/v1/anyquiz/questions/` + selectedQuiz)
            .then(response => response.json())
            .then(response => {
                var list = []
                for (var i = 0; i < response.questions.length; i++) {
                    list.push(response.questions[i])
                }
               
                return list

            })
            .then(list => {
                this.setState({
                    questions: list,
                    totalNumber: list.length
                })
                return list[this.state.counter]
            })
            .then(data => this.setState({
                question: data.question,
                answerOptions: data.answer,
                questionType: data.q_type,
                questionId: data.id,
            }))

    }

    //setUserAnswer(answer) {
    //    this.setState({})
    //}
    //
    //setResults() {
    //
    //}

    setPreviousQuestion() {

        if (this.state.counter > 0) {
            const counter = this.state.counter - 1
            this.setState({
                counter: counter,
                question: this.state.questions[counter].question,
                answerOptions: this.state.questions[counter].answer,
                questionId: this.state.questions[counter].id,
                questionType: this.state.questions[counter].q_type,
                selectedAnswer: this.state.answers[counter]
            })
        } else {
            // Do nothing, don't change the question 
            // For future improvement we'll disable the button 
        }
 
    }
    
    setNextQuestion() {

        if (this.state.counter < this.state.totalNumber - 1) {
            const counter = this.state.counter + 1
            
            this.setState({
                counter: counter,
                question: this.state.questions[counter].question,
                answerOptions: this.state.questions[counter].answer,
                questionId: this.state.questions[counter].id,
                questionType: this.state.questions[counter].q_type,
                selectedAnswer: this.state.answers[counter]
            })
        } else {
            // Display result

            this.setState({
                completed: true
            })
        }

    }

    // Record user answers
    // Update the question being displayed 
    handleAnswerSelected(event) {
        //this.setUserAnswer(event.currentTarget.value);
        // if (this.state.counter < this.state.questions.length - 1) {
        //     setTimeout(() => this.setNextQuestion(), 300);
        // } else {
        //     setTimeout(() => this.setResults(), 300);
        //     this.setState({
        //         completed:true
        //     })
        // }

        // If the current key value pair exists in the state replace it
        // Otherwise append to the dictionary

        // this.setState(prevState => ({
        //     answers: {
        //         ...prevState.answers,
        //         [this.state.counter]: event.currentTarget.value
        //     },
        //     selectedAnswer: event.currentTarget.value
        // }))

        console.log(event)

    }

    renderLogic() {

        if (this.state.completed) {

            return (
                <Results />
            )

        } else {

            return (
                <Question 
                question={this.state.question}
                questionType={this.state.questionType}
                answerOptions={this.state.answerOptions}
                questionId={this.state.questionId}
                counter={this.state.counter}
                totalNumber={this.state.totalNumber}
                selectedAnswer={this.state.selectedAnswer}
                onSelectPrevious={() => this.setPreviousQuestion()} //Bind this??
                onSelectNext={() => this.setNextQuestion()}
                onAnswerSelected={() => console.log("clicked")} />

            )

        }
    }

    render() {
        
        if (this.state.questions.length > 0) {
            return (

                <div>
                    <div className="App-header">
                        <h2>{this.props.location.state.selectedQuiz} quiz</h2>
                    </div>
                    {this.renderLogic()}
                </div>

            )
        }
        return (
            <div>
                Loading
            </div>
        )

    }

}

export default QuestionView;
