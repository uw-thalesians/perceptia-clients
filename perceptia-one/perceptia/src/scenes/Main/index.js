import React, {Fragment} from 'react';
import {Switch, Route} from "react-router-dom";
import {Footer, NavBar, QuestionView, QuizGallery, Study} from "../../components";
import ErrorBoundary from './../../components/ErrorBoundary';
import NotFound from './../../components/NotFound';
import Sign from './../Sign/';


const routes = {
  root: '/',
  quizMode: '/quiz',
  studyMode: '/study',
    sign: {
        signUp: '/signup',
        signIn: '/signin',
    },

};

export default class Main extends React.Component {
  render() {
    return (
      <Fragment>
        <NavBar routes={routes.sign}/>
        <ErrorBoundary context={"An unexpected error has occurred. Please reload the application."}>
          <Switch>
            <Route exact path={routes.root} component={QuizGallery}/>
            <Route path={routes.quizMode} component={QuestionView}/>
            <Route path={routes.studyMode} component={Study}/>
            <Route path={[routes.sign.signUp, routes.sign.signIn]} render={() => <Sign routes={routes.sign}/>}/>
            <Route component={NotFound}/>
          </Switch>
        </ErrorBoundary>
        <Footer/>
      </Fragment>
    );
  }
}