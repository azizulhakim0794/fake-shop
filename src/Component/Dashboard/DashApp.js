import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "../CommonComponent/SideNavWithAppBar/Dashboard";

const DashApp = () => {
    return (
        <Router>
        {/* <Dashboard/> */}
        <Switch>
          <Route path="/f">
            <Dashboard />
          </Route>
          <Route path="*">
            <h3>this is no match  page</h3>
          </Route>
        </Switch>
      </Router>
    );
};

export default DashApp;