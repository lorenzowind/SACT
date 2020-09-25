import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import Home from '../pages/Home';
import Ranking from '../pages/Ranking';
import Evaluator from '../pages/Evaluator';
import Admin from '../pages/Admin';
import Project from '../pages/Project';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={SignIn} />
    <Route path="/dashboard" component={Home} />
    <Route path="/ranking" component={Ranking} />
    <Route path="/evaluator" component={Evaluator} />
    <Route path="/project" component={Project} />
    <Route path="/admin" component={Admin} />
  </Switch>
);

export default Routes;
