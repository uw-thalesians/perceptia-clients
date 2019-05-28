import React from 'react';
import PropTypes from 'prop-types';
import {
    Button, CssBaseline, FormControl, Input, InputLabel, Paper, Typography, withStyles
} from '@material-ui/core';
import {apiGateway as api} from './../../../../services/api';

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
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

function handleSubmit(event) {
    event.preventDefault();
    let user = {
        username: event.value.username,
        displayName: event.value.username,
        fullName: event.value.username,
        password: event.value.password
    };
    console.log(user);

    api.gatewayApiV1UsersPost(user);
}

function SignUp(props) {
    const { classes } = props;

    return (
        <main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Create an account
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <Input id="username" name="username" autoComplete="username" autoFocus />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input name="password" type="password" id="password" autoComplete="current-password" />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Re-enter Password</InputLabel>
                        <Input name="confirmation" type="confirmation" id="confirmation"/>
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                </form>
            </Paper>
        </main>
    );
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);