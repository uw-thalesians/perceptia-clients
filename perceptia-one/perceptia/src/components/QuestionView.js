import React from 'react';
import {Question, Results} from './index.js';
import constants from './constants';
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

        };
    }

    componentDidMount() {

        const { selectedQuiz } = this.props.location.state;

        fetch(`${constants.api.url}/api/v1/anyquiz/questions/` + selectedQuiz)
            .then(response => response.json())
            .then(response => {
                let list = [];
                for (let i = 0; i < response.questions.length; i++) {
                    list.push(response.questions[i]);
                }
               
                return list;

            })
            .then(list => {
                this.setState({
                    questions: list
                });
                return list[this.state.counter];
            })
            .then(data => this.setState({
                question: data.question,
                answerOptions: data.answer,
                question_type: data.q_type,
                questionId: data.id,
            }));

    }

    //setUserAnswer(answer) {
    //    this.setState({})
    //}
    //
    //setResults() {
    //
    //}
    
    setNextQuestion = () => {
        if (this.state.counter === this.state.questions.length -1) {
            return;
        }
        const counter = this.state.counter + 1;
        
        this.setState((state) =>({
            counter: counter,
            question: state.questions[counter].question,
            answerOptions: state.questions[counter].answer,
            questionId: state.questions[counter].id,
            question_type: state.questions[counter].q_type
        }));

    };

    handleAnswerSelected = (event) => {
        //this.setUserAnswer(event.currentTarget.value);
        if (this.state.counter < this.state.questions.length - 1) {
            setTimeout(() => this.setNextQuestion(), 300);
        } else {
            //setTimeout(() => this.setResults(), 300);
            this.setState({
                completed:true
            });
        }
    };

    renderLogic = () => {

        console.log(this.state.completed);

        if (this.state.completed) {

            return (
                <Results />
            );

        } else {

            return (
                <Question 
                question={this.state.question}
                question_type={this.state.question_type}
                answerOptions={this.state.answerOptions}
                questionId={this.state.questionId}
                onAnswerSelected={this.handleAnswerSelected} />

            );

        }
    };

    render() {
        
        if (this.state.questions.length > 0) {
            return (

                <div>
                    <div className="App-header">
                        <h2>{this.props.location.state.selectedQuiz} quiz</h2>
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
