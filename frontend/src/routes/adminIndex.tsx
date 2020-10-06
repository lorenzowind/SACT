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

    <Route path="/dashboard" component={Dashboard} />
    <Route path="/ranking" component={Ranking} />

    <Route path="/admins" component={Admins} />
    <Route path="/avaliations" component={Avaliations} />
    <Route path="/evaluators" component={Evaluators} />
    <Route path="/projects" component={Projects} />

    <Route path="/admin-form" component={AdminForm} />
    <Route path="/avaliation-form" component={AvaliationForm} />
    <Route path="/evaluator-form" component={EvaluatorForm} />
    <Route path="/project-form" component={ProjectForm} />
  </Switch>
);

export default Routes;
