import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import PrivateRoutes from "./privateRoutes";

import InitScreen from "../pages/InitScreen/index"
import ProjectsViewScreen from "../pages/ProjectsViewScreen/index"
import ProjectDescriptionScreen from "../pages/ProjectDescriptionScreen/index"
import ProjectAvaliationScreen from "../pages/ProjectAvaliationScreen/index"

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={InitScreen} />
      <PrivateRoutes exact path="/projects-view" component={ProjectsViewScreen} />
      <PrivateRoutes exact path="/projects-view-description" component={ProjectDescriptionScreen} />
      <PrivateRoutes exact path="/projects-view-description-avaliation" component={ProjectAvaliationScreen} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
