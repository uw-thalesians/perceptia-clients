import React from 'react';
import { connect } from 'react-redux';
import {Switch, Route} from "react-router-dom";

import SignIn from './scenes/SignIn';
import SignOut from './scenes/SignOut';
import SignUp from './scenes/SignUp';


class Sign extends React.Component {


    render() {
        if (this.props.authenticated) {
        return <SignOut/>;
        } else {
            return (
                <Switch>
                    <Route path={this.props.routes.signIn} component={SignIn}/>
                    <Route path={this.props.routes.signUp} component={SignUp}/>
                </Switch>
            );
        }

    }
}
function  mapStateToProps(state) {
    return {
        authenticated: state.services.session.authenticated
    };
}

export default connect(mapStateToProps)(Sign);