import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

const styles = theme => ({
    appBar: {
      position: 'relative',
    },
    toolbarTitle: {
      flex: 1,
    }
});

function NavBar(props) {
    const { classes } = props;
  
    return (
        <AppBar position="static" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
              Perceptia
            </Typography>
            <Button color="primary" variant="outlined">
              Sign In
            </Button>
            <Button color="primary" variant="outlined">
              Sign Up
            </Button>
          </Toolbar>
        </AppBar>
    );
  }
  
  NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(NavBar);