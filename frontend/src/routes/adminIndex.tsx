import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './adminRoute';

import SignIn from '../pages/Admin/SignIn';

import Dashboard from '../pages/Admin/Dashboard';
import Ranking from '../pages/Admin/Ranking';

import Admins from '../pages/Admin/Admins';
import Questions from '../pages/Admin/Questions';
import Evaluators from '../pages/Admin/Evaluators';
import Projects from '../pages/Admin/Projects';

import AdminForm from '../pages/Admin/Form/AdminForm';
import QuestionForm from '../pages/Admin/Form/QuestionForm';
import EvaluatorForm from '../pages/Admin/Form/EvaluatorForm';
import ProjectForm from '../pages/Admin/Form/ProjectForm';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/admin" component={SignIn} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/ranking" component={Ranking} isPrivate />

    <Route path="/admins" component={Admins} isPrivate />
    <Route path="/questions" component={Questions} isPrivate />
    <Route path="/evaluators" component={Evaluators} isPrivate />
    <Route path="/projects" component={Projects} isPrivate />

    <Route path="/admin-form" component={AdminForm} isPrivate />
    <Route path="/question-form" component={QuestionForm} isPrivate />
    <Route path="/evaluator-form" component={EvaluatorForm} isPrivate />
    <Route path="/project-form" component={ProjectForm} isPrivate />
  </Switch>
);

export default Routes;
