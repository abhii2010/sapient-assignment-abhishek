import React from "react";
import { Route, Switch } from "react-router-dom";
import routeList from "./RouteList";

const Routes = () => (
  <div className="container-fluid">
    <Switch>
      {
        routeList.map(route => {
          return (<Route
            key={route.path}
            exact={route.exact}
            path={route.path}
            component={route.component}
          />)
        })
      }
      
    </Switch>
  </div>
);

export default Routes;
