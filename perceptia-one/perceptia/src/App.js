import React from 'react';
import { BrowserRouter as Router, Switch , Route} from "react-router-dom";

import Main from 'scenes/Main';


import 'App.css';

const root = '/';

class App extends React.Component {

  render() {
    return <React.Fragment>
        <Router>
          <Switch>
            <Route path={root} component={Main}/>
          </Switch>
        </Router>
      </React.Fragment>
    ;
  }
}

export default App;
