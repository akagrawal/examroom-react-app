import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
/**
 * Import all page components here
 */

import Reception from "./components/reception/reception";
import Login from "./components/reception/login";
import Register from "./components/reception/register";
import Lobby from "./components/lobby/lobby";
import Room from "./components/room/room";

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Reception}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/register" component={Register}></Route>
          <Route exact path="/lobby" component={Lobby}></Route>
          <Route exact path="/room*" component={Room}></Route>
          {/* <Redirect to='/404'/> */}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
