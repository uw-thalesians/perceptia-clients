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
import LinearProgress from '@material-ui/core/LinearProgress';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import QuizInfo from './QuizInfo';
import Question from './Question';
import constants from './constants';
import Results from './Results'
import Study from './Study';
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
            paragraphs: null,
            paragraph_index: 0,
            paragraph: null,
            completed: false,
            grades: [],
            mode: "normal",
        }
    }

    componentDidMount() {

        const { selectedQuiz } = this.props.location.state;
        
        var mode = this.props.location.state.mode
        var mode_url = "quiz";

        if(mode==="quiz") {
            mode_url = "questions";
        } else {
            mode_url = "study";
        }

        fetch(`${constants.api.url}/api/v1/anyquiz/${mode_url}/${selectedQuiz}`)
            .then(response => response.json())
            .then(response => {
                /*var list = []
                for (var i = 0; i < response.questions.length; i++) {
                    list.push(response.questions[i])
                }*/
               
                var paragraphs = null;
                var paragraph = null;
                if(response.paragraphs != undefined){
                    paragraphs = response.paragraphs;
                    paragraph = paragraphs[0];
                }

                this.setState({
                    paragraphs: paragraphs,
                    paragraph: paragraph,
                    questions: response.questions,
                    mode: mode,
                    paragraph_id: response.questions[this.state.counter].p_id,
                })

                return response.questions

            })
            .then(list => {
                return list[this.state.counter]
            })
            .then(data => this.setState({
                question: data.question,
                answerOptions: data.answer,
                question_type: data.q_type,
                questionId: data.id,
                paragraph_id: this.state.questions[this.state.counter].p_id,
            }))

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
            question_type: this.state.questions[counter].q_type,
            paragraph_id: this.state.questions[counter].p_id,
        })

    }

    handleAnswerSelected(answer) {

        console.log(answer);//, event.currentTarget.value);
        //this.setUserAnswer(event.currentTarget.value);
        if (this.state.counter < this.state.questions.length - 1) {
            var body = JSON.stringify({
                "questionID":`${this.state.questionId}`,
                "selectedAnswer": `${answer}`});

            fetch(`${constants.api.url}/api/v1/anyquiz/questions/grade`, {
                method: 'post',
                body: body,
            })
            .then( response => response.json())
            .then(response =>{

                this.setState({grades: this.state.grades.concat([response["result"]])})

            }).then(() => this.setNextQuestion())
            //setTimeout(, 300);
        } else {
            
            //setTimeout(() => this.setResults(), 300);
            this.setState({
                completed:true,
                counter: this.state.counter+1
            })
        }
    }

    handlePairedQuestions(event) {
        //this.setUserAnswer(event.currentTarget.value);
        if (this.state.paragraph_index < this.state.paragraphs.length - 1) {
            this.setState({
                paragraph_index: this.state.paragraph_index+1,
            });
            //setTimeout(() => this.(), 300);
        } else {
            //setTimeout(() => this.setResults(), 300);
            this.setState({
                completed:true
            })
        }
    }

    renderLogic() {

        if (this.state.completed) {

            return (
                <Results questions={this.state.questions} grades={this.state.grades}/>
            )

        } else {

            console.log(this.state.mode==="study", this.state.paragraph_index <= this.state.counter, this.state.paragraph_id < this.state.paragraphs[this.state.paragraph_index].id)
            if(this.state.mode==="study" && this.state.paragraph_index <= this.state.counter){
                
                var psummary = this.state.paragraphs.filter((p)=> p.id == this.state.paragraph_id)

                return <Study 
                    quiz={this.props.location.state.selectedQuiz}
                    summary={psummary}
                    onNext={() => this.handlePairedQuestions()} />
            }

            return (
                <Question 
                question={this.state.question}
                question_type={this.state.question_type}
                answerOptions={this.state.answerOptions}
                questionId={this.state.questionId}
                onAnswerSelected={(option)=>this.handleAnswerSelected(option)} />

            )

        }
    }

    render() {
//<!-- className="App-header">-->
//console.log(this);
        if (this.state.questions.length > 0) {
            return(
                <div>
                    <div>
                        <h2>{this.props.location.state.selectedQuiz} {this.state.mode=="normal"?"quiz":"study"}</h2>

                        <div className="progress">
                            <div id="question-progress" className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" ariavalue-max="10"></div>
                            <LinearProgress variant="determinate" value={this.state.counter*100/this.state.questions.length}/>
                        </div>
                    </div>
                    {this.renderLogic()}
                </div>
            );
        }

        return (
            <div>
                Loading
            </div>
        );

    }

}

export default QuestionView;
