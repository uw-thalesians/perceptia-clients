import React from 'react';
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
  contentContainer: {
    marginTop: '10px',
    flex: 1
  },
  siteContainer: {
    display: 'flex',
    minHeight: '100vh',
    paddingLeft: '0',
    paddingRight: '0',
    flexDirection: 'column',
  }
};

class Main extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <Container className={classNames(classes.siteContainer)}>
        <NavBar routes={routes.sign} history={this.props.history} />
        <ErrorBoundary context={"An unexpected error has occurred. Please reload the application."}>
          <Container maxWidth={'lg'} className={classNames(classes.contentContainer)}>
            <Switch>
              <Route exact path={routes.root} component={QuizGallery}/>
              <Route path={[routes.quizMode, routes.studyMode]} component={QuestionView}/>
              <Route path={[routes.sign.signUp, routes.sign.signIn]} render={() => <Sign routes={routes.sign}/>}/>
              <Route component={NotFound}/>
            </Switch>
          </Container>
        </ErrorBoundary>
        <Footer/>
      </Container>
    );
  }
}

export default withStyles(styles)(Main);