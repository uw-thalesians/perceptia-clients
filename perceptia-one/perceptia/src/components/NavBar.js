import React from 'react';
import PropTypes from 'prop-types';
import {
    AppBar, Button, Toolbar, Typography, withStyles
} from '@material-ui/core';

const styles = theme => ({
    appBar: {
      position: 'relative',
    },
    toolbarTitle: {
      flex: 1,
      textAlign: 'center',
    }
});

function NavBar(props) {
    const { classes } = props;
  
    return (
        <AppBar position="static" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle} onClick={() => {props.history.push('/');}}>
              Perceptia
            </Typography>
            <Button color="primary" variant="outlined" onClick={() => {props.history.push(props.routes.signIn);}}>
               Sign In
            </Button>
            <Button color="primary" variant="outlined" onClick={() => {props.history.push(props.routes.signUp);}}>
                Sign Up
            </Button>
          </Toolbar>
        </AppBar>
    );
  }
  
  NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
      routes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(NavBar);