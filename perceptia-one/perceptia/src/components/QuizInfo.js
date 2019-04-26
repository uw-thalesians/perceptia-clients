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

class QuizInfo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      quiz:null
    };
  }

  // componentDidMount() {
  //   fetch('http://students.washington.edu/long27km/any_quiz/v1/list')
  //     // .then(response => response.json())
  //     // .then(result => console.log(result.quizzes[0].keyword))
  //     .then(response => response.json())
  //     .then(result => this.state())
  // }

  render() {
    return (
      <div> RIP </div>
    );
  }
}

export default QuizInfo;

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

