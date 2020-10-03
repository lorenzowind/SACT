import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import ProjectsView from '../pages/ProjectsView';
import ProjectInfo from '../pages/ProjectInfo';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/view" component={ProjectsView} />
    <Route path="/project" component={ProjectInfo} />
  </Switch>
);

export default Routes;
