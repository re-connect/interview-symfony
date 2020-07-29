import React, { Fragment } from "react";
import "./App.css";
import request from 'superagent';
import names from "./names";
import { HashRouter, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import HomePage from "./pages/homePage";


const apiEndpoint = "https://avatars.dicebear.com/v2/avataaars/";
const apiOptions = "options[mood][]=happy";
const backendUrl = "https://localhost:8000";
const beneficiariesEndpoint = `${backendUrl}/api/beneficiaries?format=json`;
const loginEndpoint = `${backendUrl}/authentication_token`;

const getAvatar = name => `${apiEndpoint}${name}.svg?${apiOptions}`;

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
