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
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(QuizInfo);