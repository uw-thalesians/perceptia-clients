import React, {Fragment} from 'react';
import {Grid, withStyles} from '@material-ui/core';
import {QuizInfo} from './';
import constants from './constants';

const styles = {
  cardGrid: {
    padding: `8px`, //Need adjustment
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  }
};

class QuizGallery extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      quizlist: []
    };
  }

  componentDidMount() {
    console.log(`${constants.api.url}/api/v1/anyquiz/list`);
    fetch(`${constants.api.url}/api/v1/anyquiz/list`)
      .then(response => response.json())
      .then(response => {
        var list = [];
        for (var i = 0; i < response.quizzes.length; i++) {
          list.push(response.quizzes[i].keyword);
        }

        return list;

      })
      .then(list => this.setState({
        quizlist: list
      }));
  }

  // handleChildClick(component, event) {
  //     this.setState({
  //         selectedQuiz:component.props.quizName
  //     })
  //     this.props.liftStateUp(component.props.quizName)
  // }

  render() {
    return (
      <Fragment>
        <Grid container spacing={4}>
          {this.state.quizlist.map(name => (
            <Grid item key={name} sm={6} md={4} lg={3}>
              <QuizInfo quizName={name}/>
            </Grid>
          ))}
        </Grid>
      </Fragment>

    );
  }

}

export default withStyles(styles)(QuizGallery);
