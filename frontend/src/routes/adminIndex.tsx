import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './adminRoute';

import SignIn from '../pages/Admin/SignIn';

import Dashboard from '../pages/Admin/Dashboard';
import Ranking from '../pages/Admin/Ranking';

import Admins from '../pages/Admin/Admins';
import Avaliations from '../pages/Admin/Avaliations';
import Evaluators from '../pages/Admin/Evaluators';
import Projects from '../pages/Admin/Projects';

import AdminForm from '../pages/Admin/Form/AdminForm';
import AvaliationForm from '../pages/Admin/Form/AvaliationForm';
import EvaluatorForm from '../pages/Admin/Form/EvaluatorForm';
import ProjectForm from '../pages/Admin/Form/ProjectForm';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/admin" component={SignIn} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/ranking" component={Ranking} isPrivate />

    <Route path="/admins" component={Admins} isPrivate />
    <Route path="/avaliations" component={Avaliations} isPrivate />
    <Route path="/evaluators" component={Evaluators} isPrivate />
    <Route path="/projects" component={Projects} isPrivate />

    <Route path="/admin-form" component={AdminForm} isPrivate />
    <Route path="/avaliation-form" component={AvaliationForm} isPrivate />
    <Route path="/evaluator-form" component={EvaluatorForm} isPrivate />
    <Route path="/project-form" component={ProjectForm} isPrivate />
  </Switch>
);

export default Routes;
