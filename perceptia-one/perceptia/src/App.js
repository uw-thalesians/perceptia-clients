import React from 'react';
import { BrowserRouter as Router, Switch , Route} from "react-router-dom";
import { Provider } from 'react-redux';

import Main from './scenes/Main';
import store from './store';

import './App.css';

const root = '/'

class App extends React.Component {

  render() {
    return <React.Fragment>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path={root} component={Main}/>
          </Switch>
        </Router>
      </Provider>
      </React.Fragment>
    ;
  }
}

export default App;
