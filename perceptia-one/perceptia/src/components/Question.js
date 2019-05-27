import React from 'react';

import './quiz.css';

let quizTypeMultipleChoice = '1';
//let quizTypeTrueFalse = '2'

class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            question:"",
            question_type:"",
            questionId:"",
            answerOptions:[]

        };
    }



    static getDerivedStateFromProps(nextProps) {
        return {
            question:nextProps.question,
            question_type:nextProps.question_type,
            questionId:nextProps.questionId,
            answerOptions:nextProps.answerOptions
        };
    }

    render() {

        if (this.state.question_type === quizTypeMultipleChoice) {
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
            );
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
            );
        }
    }

}

export default Question;