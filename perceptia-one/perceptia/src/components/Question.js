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
import QuizInfo from './QuizInfo'
import MultipleChoice from './MultipleChoice'
import TrueOrFalse from './TrueOrFalse'

class Question extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            question:"",
            question_type:"",
            question_id:"",
            answer:[]

        }
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            question:nextProps.data.question,
            question_type:nextProps.data.q_type,
            question_id:nextProps.data.id,
            answer:nextProps.data.answer
        }
    }

    render() {

        if (this.state.question_type == 1) {
            return (
                // <MultipleChoice />
                <div>
                    <h2>{this.state.question}</h2>
                    <ul>
                        {this.state.answer.map(option => (
                            <li>
                                {option}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        } else { // q_type == 2
            return (
                // <TrueOrFalse />
                <div>
                    <h2>{this.state.question}</h2>
                    <ul>
                        <li>
                            True
                        </li>
                        <li>
                            False
                        </li>
                    </ul>
                </div>
            )
        }
    }

}

export default Question;