import React from 'react';
import { InputBase, IconButton, Paper, withStyles } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons/';

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px'
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
};

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInput:'',
            errorMessage:'',
            timeoutHandle: null,
        };
    }
    
    handleSubmit(evt) {
        evt.preventDefault();
        if (this.state.userInput !== '') {
          this.props.onSearchQuiz(this.state.userInput);
        }
    }

    render() {
      const { classes } = this.props;
      return (
        <Paper className={classes.root}>
          {
            this.state.errorMessage ?
              <div className={"Center-Align"}>
                {this.state.errorMessage}
              </div> :
              undefined
          }
          <InputBase
            className={classes.input}
            placeholder="Search Topics from Wiki..."
            inputProps={{ 'aria-label': 'Search Topics from Wikipedia' }}
            defaultValue={this.state.userInput}
            onSubmit={evt => this.handleSubmit(evt)}
            onKeyUp={evt => {
              if(this.state.timeoutHandle) {
                clearTimeout(this.state.timeoutHandle);
              }
              if (evt.key === 'Enter') {
                this.handleSubmit(evt);
                return;
              }

              let value = evt.target.value;
              let handle = setTimeout((value)=>{this.props.onFilterQuiz(value);}, 200, value);

              this.setState({
                userInput: evt.target.value,
                timeoutHandle: handle
              });
            }}
          />
          <IconButton className={classes.iconButton} aria-label="Search" onClick={evt => this.handleSubmit(evt)}>
            <SearchIcon />
          </IconButton>

        </Paper>
      );
    }
}

export default withStyles(styles)(SearchBar);