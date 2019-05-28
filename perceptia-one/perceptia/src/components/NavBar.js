import React from 'react';
import PropTypes from 'prop-types';
import {
    AppBar, Button, Toolbar, Typography, withStyles
} from '@material-ui/core';
import { Link } from "react-router-dom";

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
            <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle} onClick={props.hi}>
              Perceptia
            </Typography>
            <Button color="primary" variant="outlined">
                <Link to={{pathname:props.routes.signIn}}>Sign In</Link>
            </Button>
            <Button color="primary" variant="outlined">
                <Link to={{pathname:props.routes.signUp}}>Sign Up</Link>
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