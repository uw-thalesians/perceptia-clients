import React, {Fragment} from 'react';
import classNames from 'classnames';
import {Switch, Route} from "react-router-dom";
import { Container, withStyles } from '@material-ui/core';
import { Footer, NavBar, QuestionView, QuizGallery } from "components/";
import ErrorBoundary from 'components/ErrorBoundary/';
import NotFound from 'components/NotFound/';
import Sign from 'scenes/Sign/';


const routes = {
  root: '/',
  quizMode: '/quiz',
  studyMode: '/study',
    sign: {
        signUp: '/signup',
        signIn: '/signin',
    },

};
const styles = {
  container: {
    marginTop: '10px'
  },
};

class Main extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <NavBar routes={routes.sign} history={this.props.history} />
        <ErrorBoundary context={"An unexpected error has occurred. Please reload the application."}>
          <Container maxWidth={'lg'} className={classNames(classes.container)}>
            <Switch>
              <Route exact path={routes.root} component={QuizGallery}/>
              <Route path={[routes.quizMode, routes.studyMode]} component={QuestionView}/>
              <Route path={[routes.sign.signUp, routes.sign.signIn]} render={() => <Sign routes={routes.sign}/>}/>
              <Route component={NotFound}/>
            </Switch>
          </Container>
        </ErrorBoundary>
        <Footer/>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Main);