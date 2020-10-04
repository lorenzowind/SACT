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
    <Route path="/evaluator-register" component={EvaluatorRegister} />
    <Route path="/project" component={Project} />
    <Route path="/project-register" component={ProjectRegister} />
    <Route path="/evaluation" component={Evaluation} />
    <Route path="/session-register" component={SessionRegister} />
    <Route path="/criterion-register" component={CriterionRegister} />
    <Route path="/admin" component={Admin} />
    <Route path="/admin-register" component={AdminRegister} />
  </Switch>
);

export default Routes;
