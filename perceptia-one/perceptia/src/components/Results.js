import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {CheckCircle, NotInterested} from '@material-ui/icons';


class Results extends React.Component{

  constructor(props) {
    super(props);
    console.log(props);
  }



  render() {
    //const classes = useStyles();
    console.log(this);
    if(!this || !this.props){
      return (<span>Loading...</span>)
    }

    return (
        <div>
          You have reached the end! <strong>Here's your results</strong>!
          <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Result</TableCell>
              <TableCell>Question</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.questions.map((question, index)=>{return (
            <TableRow key={"result_"+index}>
              <TableCell>{this.props.grades[index]?<CheckCircle style={{"color": "green"}}/>:<NotInterested style={{"color": "red"}}/>}</TableCell>
              <TableCell>{question.question}</TableCell>
            </TableRow>)
            })}
          </TableBody>
          </Table>
          </Paper>

          
        </div>
    );
  }
}
export default Results;