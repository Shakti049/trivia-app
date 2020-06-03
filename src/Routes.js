import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import MCQPage from './MCQPage';

class Routes extends Component {
    render() {
        return (
            <Router>
              <Switch>
                <Route path="/" component={App} exact />
                <Route path="/MCQPage/:id/:time" component={MCQPage} />
              </Switch>
          </Router>
        );
    }
}

export default Routes;