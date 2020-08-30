import React from "react";
import { Switch, Route } from "react-router-dom";

// Páginas
import Dashboard from "../pages/Dashboard";
import Detalhes from "../pages/Detalhes";

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/detalhes" component={Detalhes} />
    </Switch>
);



export default Routes;
