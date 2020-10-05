import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './evaluatorRoute';

import SignIn from '../pages/Evaluator/SignIn';

import ProjectAvaliation from '../pages/Evaluator/ProjectAvaliation';
import ProjectInfo from '../pages/Evaluator/ProjectInfo';
import ProjectsList from '../pages/Evaluator/ProjectsList';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />

    <Route path="/project-avaliation" component={ProjectAvaliation} isPrivate />
    <Route path="/project-info" component={ProjectInfo} isPrivate />
    <Route path="/projects-list" component={ProjectsList} isPrivate />
  </Switch>
);

export default Routes;
