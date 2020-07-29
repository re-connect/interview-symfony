import React, { Fragment } from "react";
import "./App.css";
import request from 'superagent';
import names from "./names";
import { HashRouter, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import HomePage from "./pages/homePage";

function App() {

    return (
        <Fragment>
            <HashRouter>
                <Switch>
                    <Route path="/login" component={LoginPage} />
                    <Route path="/" component={HomePage} />
                </Switch>
            </HashRouter>
        </Fragment>
    );
}

export default App;
