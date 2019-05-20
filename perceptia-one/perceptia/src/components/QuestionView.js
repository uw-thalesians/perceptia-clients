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
import Question from './Question';
import constants from './constants';

// function QuestionView(props) {
//     function renderAnswerOptions(key) {
//       return (
//         <AnswerOption
//           key={key.content}
//           answerContent={key.content}
//           answerType={key.type}
//           answer={props.answer}
//           questionId={props.questionId}
//           onAnswerSelected={props.onAnswerSelected}
//         />
//       );
//     }
  
//     return (
//       <CSSTransitionGroup
//         className="container"
//         component="div"
//         transitionName="fade"
//         transitionEnterTimeout={800}
//         transitionLeaveTimeout={500}
//         transitionAppear
//         transitionAppearTimeout={500}
//       >
//         <div key={props.questionId}>
//           <Question content={props.question} />
//           <ul className="answerOptions">
//             {props.answerOptions.map(renderAnswerOptions)}
//           </ul>
//         </div>
//       </CSSTransitionGroup>
//     );
//   }
  
//   QuestionView.propTypes = {
//     answer: PropTypes.string.isRequired,
//     answerOptions: PropTypes.array.isRequired,
//     question: PropTypes.string.isRequired,
//     questionId: PropTypes.number.isRequired,
//     questionTotal: PropTypes.number.isRequired,
//     onAnswerSelected: PropTypes.func.isRequired
//   };
  
//   export default QuestionView;


class QuestionView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            quiz:"angelfish",
            questions: []
            
        }
    }

    componentWillMount() {

        fetch(`${constants.api.url}/api/v1/anyquiz/questions/` + this.state.quiz)
            .then(response => response.json())
            .then(response => {
                var list = []
                for (var i = 0; i < response.questions.length; i++) {
                    list.push(response.questions[i])
                }
                return list
            })
            .then(list => this.setState({
                questions: list
            }))
    }

    render() {
        // const { classes } = this.props;
        if (this.state.questions.length > 0) {
            return (
                // <Question data={this.state.questions[0]}/>
                <div>
                    {this.state.questions.map(q => (
                        <Question data={q} />
                    ))}
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
