import React from 'react';
import PropTypes from 'prop-types';
import {
    Button, CssBaseline, Paper, Typography, withStyles
} from '@material-ui/core';

/*const SVG = ({
    style = {},
    fill = '#fff',
    width = '100%',
    className = '',
    height = '100%',
    viewBox = '0 0 32 32',
  }) =>
    <svg
      width={width}
      style={style}
      height={height}
      viewBox={viewBox}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
        <path d="./img/brand.svg" fill={fill} />
    </svg>;*/

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

function SignOut(props) {
    const { classes } = props;

    return (
        <main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h5">
                    You're already signed in! (But if you want to leave, use the sign out button below)
                </Typography>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign out
                </Button>
            </Paper>
        </main>
    );
}

SignOut.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignOut);