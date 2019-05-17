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
            questions: [],
            question: null,
            questionId: null,
            question_type: null,
            answerOptions: [],
            answers: {},
            counter: 0,
            completed: false,

        }
    }

    // componentWillMount() {

    //     const { selectedQuiz } = this.props.location.state

    //     fetch(constants.localhost.url + 'questions/' + selectedQuiz)
    //         .then(response => response.json())
    //         .then(response => {
    //             var list = []
    //             for (var i = 0; i < response.questions.length; i++) {
    //                 list.push(response.questions[i])
    //             }
    //             return list
    //         })
    //         .then(list => this.setState({
    //             questions: list
    //         }))
    // }

    componentDidMount() {

        const { selectedQuiz } = this.props.location.state

        fetch(constants.localhost.url + 'questions/' + selectedQuiz)
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
                    questions: list
                })
                return list[this.state.counter]
            })
            .then(data => this.setState({
                question: data.question,
                answerOptions: data.answer,
                question_type: data.q_type,
                questionId: data.id,
            }))
            // .then(list => this.setState({
            //     questions: list,
            //     question: list[this.state.counter].question,
            //     answerOptions: list[this.state.counter].answer,
            //     question_type: list[this.state.counter].q_type,
            //     questionId: list[this.state.counter].id,

            // }))


        // this.setState({
        //     question: this.state.questions[this.state.counter].question,
        //     answerOptions: this.state.questions[this.state.counter].answer,
        //     question_type: this.state.questions[this.state.counter].q_type,
        //     questionId: this.state.questions[this.state.counter].id

        // })
    }

    //setUserAnswer(answer) {
    //    this.setState({})
    //}
    //
    //setResults() {
    //
    //}
    
    setNextQuestion() {
        const counter = this.state.counter + 1
        
        this.setState({
            counter: counter,
            question: this.state.questions[counter].question,
            answerOptions: this.state.questions[counter].answer,
            questionId: this.state.questions[counter].id,
            question_type: this.state.questions[counter].q_type
        })

    }

    handleAnswerSelected(event) {
        //this.setUserAnswer(event.currentTarget.value);
        if (this.state.counter < this.state.questions.length - 1) {
            setTimeout(() => this.setNextQuestion(), 300);
        } else {
            //setTimeout(() => this.setResults(), 300);
            this.setState({
                completed:true
            })
        }
    }

    renderLogic() {

        console.log(this.state.completed)

        if (this.state.completed) {

            return (
                <Results />
            )

        } else {

            return (
                <Question 
                question={this.state.question}
                question_type={this.state.question_type}
                answerOptions={this.state.answerOptions}
                questionId={this.state.questionId}
                onAnswerSelected={() => this.handleAnswerSelected()} />

            )

        }
    }

    render() {
        // const { classes } = this.props;
            
        if (this.state.questions.length > 0) {
            return (
                // <Question data={this.state.questions[0]}/>
                // <div>
                //     {this.state.questions.map(q => (
                //         <Question data={q} />
                //     ))}
                // </div>

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
