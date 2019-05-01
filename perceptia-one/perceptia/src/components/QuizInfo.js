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

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};

class QuizInfo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      quiz:null,
      summary:null,
      shortSummary:null
    };
  }

  componentDidMount() {

    var result = fetch('http://students.washington.edu/long27km/any_quiz/v1/list')
      .then(response => response.json())
      .then(response => this.setState({
        quiz: response.quizzes[10].keyword
    }));

    result.then(response => {
      var name = this.state.quiz;

      fetch('http://students.washington.edu/long27km/any_quiz/v1/read/' + name)
        .then(r => r.json())
        .then(r => this.setState({
          summary: r.summary
        }))

    });

    // fetch('http://students.washington.edu/long27km/any_quiz/v1/list')
    //   .then(response => response.json())
    //   .then(response => this.setState({
    //     quiz: response.quizzes[0].keyword
    // }));

    // fetch('http://students.washington.edu/long27km/any_quiz/v1/read/' + this.state.quiz)
    //   .then(response => response.json())
    //   .then(response => this.setState({
    //     summary: response.summary
    // }));


  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.summary != prevState.summary) {
      this.setState({
        shortSummary: this.state.summary.substring(0, 250) + "..."
      })
    }
  }

  render() {
    const { classes } = this.props;
    // const shortSummary = this.state.summary.substring(0, 250) + "...";
      return (
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={require('./img/placeholder.png')}
            title="placeholder"
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
          <Button size="small" color="primary">
            Detail
          </Button>
          <Button size="small" color="primary">
            Take Quiz Now!
          </Button>
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

