import React from 'react';
import PropTypes from 'prop-types';
import { Typography, withStyles } from '@material-ui/core';

const backgroundImage =
  'https://image.freepik.com/free-vector/workplace-background-design_1284-606.jpg';

const styles = theme => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#7fc7d9',
    backgroundPosition: 'center',
  },
  button: {
    minWidth: 200,
  },
  h5: {
    marginBottom: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit * 4,
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing.unit * 10,
    },
  },
  more: {
    marginTop: theme.spacing.unit * 2,
  },
});

function Header(props) {
  const { classes } = props;

  return (
      <div backgroundClassName={classes.background}>
      {/*<img src={backgroundImage} alt="" />*/}
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Perceptia
      </Typography>
      <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
        A personalized studying tool for computer assisted learning and dynamic assessments
      </Typography>
        Learn More
      <Typography variant="body2" color="inherit" className={classes.more}>
        Request for Demo
      </Typography>
      </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);