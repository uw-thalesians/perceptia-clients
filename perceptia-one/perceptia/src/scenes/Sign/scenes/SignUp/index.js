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

class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      usernameError: false,
      usernameErrorMessage: '',
      displayName: '',
      displayNameError: false,
      displayNameErrorMessage: '',
      password: '',
      passwordError: false,
      passwordErrorMessage: '',
      passwordConf: '',
      passwordNotMatchError: false,
      passwordNotMatchErrorMessage: '',
    };
  }

  handleChange = (event) => {
    this.setState({[event.target.name]:event.target.value});
    this.validateNewUser();
  };

  validateNewUser = () => {
    let valid = true;
    if (this.state.username.length < 3) {
      valid = false;
      this.setState({
        usernameError: true, usernameErrorMessage: 'username must be at least 3 characters'
      });
    } else {
      this.setState({
        usernameError: false, usernameErrorMessage: ''
      });
    }
    if (this.state.displayName.length < 1) {
      valid = false;
      this.setState({
        displayNameError: true, displayNameErrorMessage: 'display name must be at least 1 characters'
      });
    } else {
      this.setState({
        displayNameError: false, displayNameErrorMessage: ''
      });
    }
    if (this.state.password.length < 8) {
      valid = false;
      this.setState({
        passwordError: true, passwordErrorMessage: 'password must be at least 8 characters'
      });
    } else {
      this.setState({
        passwordError: false, passwordErrorMessage: ''
      });
    }
    if (!Object.is(this.state.password, this.state.passwordConf)) {
      valid = false;
      this.setState({
        passwordNotMatchError: true, passwordNotMatchErrorMessage: 'passwords must match'
      });
    } else {
      this.setState({
        passwordNotMatchError: false, passwordNotMatchErrorMessage: ''
      });
    }
    return valid;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.validateNewUser()) {
      alert('Unable to create user. Check errors with input.')
      return;
    }
    let newUser = {
      username: this.state.username,
      displayName: this.state.displayName,
      fullName: this.state.displayName,
      password: this.state.password
    };
    api.gatewayApiV1UsersCreate(newUser)
      .then((response) => {
        console.log(response.data);
      },(rejectReason) => {
        console.log(rejectReason);
      });
  };


  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Create an account
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth error={this.state.usernameError}>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input id="username" name="username" autoComplete="username" autoFocus value={this.state.username} onChange={this.handleChange} />
            </FormControl>
            <FormControl margin="normal" fullWidth error={this.state.displayNameError}>
              <InputLabel htmlFor="displayName">Display Name</InputLabel>
              <Input id="displayName" name="displayName" autoComplete="displayName" autoFocus value={this.state.displayName} onChange={this.handleChange}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth error={this.state.passwordError}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" value={this.state.password} onChange={this.handleChange}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth error={this.state.passwordNotMatchError}>
              <InputLabel htmlFor="passwordConf">Re-enter Password</InputLabel>
              <Input name="passwordConf" type="password" id="passwordConf" value={this.state.passwordConf} onChange={this.handleChange}/>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled
            >
              Sign Up
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);