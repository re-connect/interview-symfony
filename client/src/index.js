import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Login from "./components/Login";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserContext from "./context/UserContext";

ReactDOM.render(
  <Router>
    <Switch>
      <UserContext.Provider value="Hello again Foo">
        <Route exact path="/" component={App} />
        <Route exact path="/login" component={Login} />
      </UserContext.Provider>
    </Switch>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
