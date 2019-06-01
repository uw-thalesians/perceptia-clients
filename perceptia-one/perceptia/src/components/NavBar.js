import React from 'react';
import PropTypes from 'prop-types';
import {
    AppBar, Button, Toolbar, Typography,withStyles
} from '@material-ui/core';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

const styles = () => ({
    appBar: {
      position: 'relative',
    },
    toolbarTitle: {
      flex: 1,
      textAlign: 'left',
      cursor: 'pointer',
    }
});

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

function NavBar(props) {
    const { classes } = props;
  
    return (
      <ElevationScroll {...props}>
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
      </ElevationScroll>
    );
  }
  
  NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
      routes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(NavBar);