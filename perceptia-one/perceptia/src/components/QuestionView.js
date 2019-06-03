import React from 'react';
import {
    LinearProgress, CircularProgress
} from '@material-ui/core';

import {Question, Results, Study} from './';
import constants from './constants';

import './quiz.css';


class QuestionView extends React.Component {

    constructor(props) {
        super(props);

        console.log(props);
        this.state = {
            selectedQuiz: null,
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
            mode: "quiz",
            busy: false,
        };
    }

    componentDidMount() {

        console.log(this.props, this.state);

        const { selectedQuiz } = this.props.location.state;
        
        var mode = this.props.location.state.mode;
        var mode_url = "questions";

        if(mode==="quiz") {
            mode_url = "questions";
        } else {
            mode_url = "study";
        }

        fetch(`${constants.api.url}/api/v1/anyquiz/${mode_url}/${selectedQuiz}`)
            .then(response => response.json())
            .then(response => {
                
                console.log("processing api response", response);

                var paragraphs = null;
                var paragraph = null;

                if(Object.keys(response).includes("paragraphs")){
                    paragraphs = response.paragraphs;
                    paragraph = paragraphs[0];
                }

                var questions = response.questions;
                var p_id = response.questions[this.state.counter].p_id;

                this.setState({
                    paragraphs: paragraphs,
                    paragraph: paragraph,
                    questions: questions,
                    mode: mode,
                    paragraph_id: p_id,
                });

                return response.questions;

            })
            .then(list => {
                return list[this.state.counter];
            })
            .then(data => {
                    this.setState({
                    question: data.question,
                    answerOptions: data.answer,
                    question_type: +data.q_type,
                    questionId: data.id,
                    paragraph_id: this.state.questions[this.state.counter].p_id,
                });
            });

    }

    setNextQuestion() {
        const counter = this.state.counter + 1;
        
        this.setState({
            counter: counter,
            question: this.state.questions[counter].question,
            answerOptions: this.state.questions[counter].answer,
            questionId: this.state.questions[counter].id,
            question_type: +this.state.questions[counter].q_type,
            paragraph_id: this.state.questions[counter].p_id,
            busy: false,
        });

    };

    handleAnswerSelected(answer) {

        if(answer==null){
            this.setState({grades: this.state.grades.concat([false])});
            this.setNextQuestion();
            return;
        }

        var body = JSON.stringify({
            "questionID":`${this.state.questionId}`,
            "selectedAnswer": `${answer}`});

        fetch(`${constants.api.url}/api/v1/anyquiz/questions/grade`, {
            method: 'post',
            body: body,
        })
        .then( response => response.json())
        .then(response =>{

            this.setState({grades: this.state.grades.concat([response["result"]])});

        }).then(() => {
            if (this.state.counter < this.state.questions.length - 1) {
                this.setNextQuestion();
            } else {
                this.setState({
                    completed:true,
                    counter: this.state.counter+1
                });
            }
            
        });
        
    }

    handlePairedQuestions(event) {
        
        if (this.state.paragraph_index < this.state.paragraphs.length - 1) {
            this.setState({
                paragraph_index: this.state.paragraph_index+1,
            });
            
        } else {
            
            this.setState({
                completed:true
            });
        }
    };

    renderLogic() {

        if (this.state.completed) {

            return (
                <Results questions={this.state.questions} grades={this.state.grades}/>
            );

        } else {

            if(this.state.mode==="study" && this.state.paragraph_index <= this.state.counter){
                
                var psummary = this.state.paragraphs.filter((p)=> p.id === this.state.paragraph_id);

                return <Study 
                    quiz={this.props.location.state.selectedQuiz}
                    summary={psummary}
                    onNext={() => this.handlePairedQuestions()} />;
            }

            console.log(this.state);

            //uses key to tell react the question has changed and needs new object,
            //look into memoization helper
            return (
                <Question key={"question_"+ this.state.questionId}
                question={this.state.question}
                question_type={this.state.question_type}
                answerOptions={this.state.answerOptions}
                questionId={this.state.questionId}
                onAnswerSelected={(option)=>this.handleAnswerSelected(option)} 
                busy={this.state.busy}/>

            );

        }
    };

    render() {
//<!-- className="App-header">-->
        if (this.state.question != null) {
            return(
                <div className={"Center-Align"}>
                    <div>
                        <h2>{this.props.location.state.selectedQuiz} {this.state.mode==="quiz"?"quiz":"study"}</h2>

                        <div className="progress">
                            <LinearProgress variant="determinate" value={this.state.counter*100/this.state.questions.length}/>
                        </div>
                    </div>
                    {this.renderLogic()}
                </div>
            );
        }

        return (
            <div className={"Center-Align"}>
                <CircularProgress/>
            </div>
        );

    }

}

export default QuestionView;
