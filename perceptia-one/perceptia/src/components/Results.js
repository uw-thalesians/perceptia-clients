import React from 'react';
import {
  CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, Paper
} from '@material-ui/core';
import {CheckCircle, NotInterested} from '@material-ui/icons';

class Results extends React.Component{
  render() {
    if(!this || !this.props){
      return (<span><CircularProgress/></span>);
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
                </TableRow>);
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}
export default Results;