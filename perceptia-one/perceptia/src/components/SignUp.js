
import React from "react";
import { Link } from "react-router-dom";
import constants from "./constants";


export default class SignUpView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            displayName: "",
            errMsg: "",
            photoURL: "https://www.gravatar.com/avatar/"
        };
    }


    componentDidMount() {
        this.authUnsub = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.history.push(constants.routes.general); //Use constants
              } 
        });
    }
    componentWillUnmount() {
        this.authUnsub();
    }

    handleSubmit(evt) { //Should work, but need to verify
        evt.preventDefault();
        if (this.state.password !== this.state.confirmPassword) {
            this.setState({ errMsg: "Password does not match" });
        } else if (this.state.password.length < 6) {
            this.setState({ errMsg: "Password must be at least 6 digits long" });
        } else {
            this.setState({ errMsg: "" });

            let hash = md5(this.state.email.trim().toLowerCase());
            this.setState({ photoURL : this.state.photoURL + hash});

            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(user => {
                    return user.updateProfile({
                        displayName: this.state.displayName,
                        photoURL: this.state.photoURL
                    });
                })
                .then(() => this.props.history.push(constants.routes.general))
                .catch(err => this.setState({ errMsg: err.message }));

        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <h1>Sign Up</h1>
                </div>
                <div className="container">

                    {this.state.errMsg ?
                        <div className="alert alert-danger">
                            {this.state.errMsg}
                        </div>
                        : undefined}

                    <form onSubmit={evt => this.handleSubmit(evt)}>

                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input id="email"
                                type="email"
                                className="form-control"
                                value={this.state.email}
                                onInput={evt => this.setState({ email: evt.target.value})}
                                placeholder="enter your email"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="displayName">Display Name:</label>
                            <input id="displayName"
                                type="text"
                                className="form-control"
                                value={this.state.displayName}
                                onInput={evt => this.setState({ displayName: evt.target.value })}
                                placeholder="enter your display name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input id="password"
                                type="password"
                                className="form-control"
                                value={this.state.password}
                                onInput={evt => this.setState({ password: evt.target.value })}
                                placeholder="enter your password"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password:</label>
                            <input id="confirmPassword"
                                type="password"
                                className="form-control"
                                value={this.state.confirmPassword}
                                onInput={evt => this.setState({ confirmPassword: evt.target.value })}
                                placeholder="re-enter your password"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">Sign Up</button>
                        </div>

                    </form>
                    <p>Already have an account? <Link to={constants.routes.signin}>Sign In</Link></p>
                </div>
            </div>
        );
    }
}