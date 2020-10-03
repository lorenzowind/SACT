import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProjectsView from '../pages/ProjectsView';

import SignIn from '../pages/SignIn';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/projects" component={ProjectsView} />
  </Switch>
);

export default Routes;
