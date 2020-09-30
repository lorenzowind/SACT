import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import Home from '../pages/Home';
import Ranking from '../pages/Ranking';
import Evaluator from '../pages/Evaluator';
import EvaluatorRegister from '../pages/EvaluatorRegister';
import Admin from '../pages/Admin';
import AdminRegister from '../pages/AdminRegister';
import Project from '../pages/Project';
import ProjectRegister from '../pages/ProjectRegister';
import Evaluation from '../pages/Evaluation';
import SessionRegister from '../pages/SessionRegister';
import CriterionRegister from '../pages/CriterionRegister';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={SignIn} />
    <Route path="/dashboard" component={Home} />
    <Route path="/ranking" component={Ranking} />
    <Route path="/evaluator" component={Evaluator} />
    <Route exact path="/evaluator/register" component={EvaluatorRegister} />
    <Route path="/project" component={Project} />
    <Route exact path="/project/register" component={ProjectRegister} />
    <Route path="/evaluation" component={Evaluation} />
    <Route
      exact
      path="/evaluation/session/register"
      component={SessionRegister}
    />
    <Route
      exact
      path="/evaluation/criterion/register"
      component={CriterionRegister}
    />
    <Route path="/admin" component={Admin} />
    <Route exact path="/admin/register" component={AdminRegister} />
  </Switch>
);

export default Routes;
