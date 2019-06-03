import React from 'react';
import {
  Button, Card, CardActions, CardContent, CardMedia, Typography, withStyles
} from '@material-ui/core';
import { Link } from "react-router-dom";
import constants from './constants';

const styles = {
  card: {
    maxWidth: 345,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
  media: {
    height: 140,
  },
};

class QuizInfo extends React.Component {

  constructor(props) {
    super(props);
    //https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
    this._ismounted=false;
    this.state = {
      quiz:null,
      summary:null,
      shortSummary:null,
      imageurl:'./placeholder.png'
    };
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      quiz:nextProps.quizName
    };
  }

  componentDidMount() {
    this._ismounted = true;

      fetch(`${constants.api.url}/api/v1/anyquiz/read/` + this.state.quiz)
        .then(response => response.json())
        .then(response => {
          let imageurl = './placeholder.png';
          if (response.image !== undefined && response.image !== 'images/quiz.png') {
            imageurl = response.image;
          }
          if(this._ismounted){
            this.setState({
              summary: response.summary,
              shortSummary: response.summary.substring(0, 250) + "...",
              imageurl: imageurl
            });
          }
        });
  }

  componentWillUnmount(){
    this._ismounted=false;
  }

  render() {
    const { classes } = this.props;

      return (
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={this.state.imageurl}
            title={this.state.quiz}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.state.quiz}
            </Typography>
            <Typography component="p">
              {this.state.shortSummary}
            </Typography>
          </CardContent>
        <CardActions>
          <Link to={{
            pathname: './study',
            state: {
              mode: "study",
              selectedQuiz: this.state.quiz,
            }
          }}>
            <Button 
              value={this.state.quiz}
              size="small"
              color="primary">
              Study
            </Button>
          </Link>
          <Link to={{
            pathname: './quiz',
            state: {
              mode: "quiz",
              selectedQuiz:this.state.quiz,
            }
          }}>
            <Button 
              value={this.state.quiz}
              size="small"
              color="primary">
              Quiz
            </Button>
          </Link>
          {/* <Button 
            value={this.state.quiz}
            onClick={this.props.onClick}
            size="small" 
            color="primary">

            <Link to="/study">Study</Link>
     
          </Button>
          <Button 
            value={this.state.quiz}
            onClick={this.props.onClick}
            size="small" 
            color="primary">
            
            <Link to="/quiz">Quiz</Link>
       
          </Button> */}
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(QuizInfo);



// const styles = {
//     card: {
//       maxWidth: 345,
//     },
//     media: {
//       height: 140,
//     },
// };

// function QuizInfo(props) {
//     const { classes } = props;

//     return (
//         <Card className={classes.card}>
//           <CardMedia
//             className={classes.media}
//             image={require('./img/placeholder.png')}
//             title="placeholder"
//           />
//           <CardContent>
//             <Typography gutterBottom variant="h5" component="h2">
//               Quiz
//             </Typography>
//             <Typography component="p">
//                 Insert Quiz summary
//             </Typography>
//           </CardContent>
//         <CardActions>
//           <Button size="small" color="primary">
//             Detail
//           </Button>
//           <Button size="small" color="primary">
//             Take Quiz Now!
//           </Button>
//         </CardActions>
//       </Card>
//     );
// }

// QuizInfo.propTypes = {
// classes: PropTypes.object.isRequired,
// };
  
// export default withStyles(styles)(QuizInfo);

  // componentDidMount() {
  //   fetch('http://students.washington.edu/long27km/any_quiz/v1/read/' + this.state.quiz)
  //     .then(r => r.json())
  //     .then(r => this.setState({
  //       summary: r.summary
  //   }))

  //   var result = fetch('http://students.washington.edu/long27km/any_quiz/v1/list')
  //     .then(response => response.json())
  //     .then(response => this.setState({
  //       quiz: response.quizzes[10].keyword
  //   }));

  //   result.then(response => {
  //     var name = this.state.quiz;

  //     fetch('http://students.washington.edu/long27km/any_quiz/v1/read/' + name)
  //       .then(r => r.json())
  //       .then(r => this.setState({
  //         summary: r.summary
  //       }))

  //   });
  // }