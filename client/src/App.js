import React, { Fragment, useState } from "react";
import "./App.css";
import request from 'superagent';
import names from "./names";
import { HashRouter, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import HomePage from "./pages/homePage";
import NewBeneficiaryPage from "./pages/newBeneficiaryPage";
import Navbar from "./components/navbar";
import authentication from "./services/authentication";

function App() {
    const token = localStorage.getItem('authToken');
    const [isAuthenticated, setIsAuthenticated] = useState(authentication.isAuthenticated());

    console.log(isAuthenticated);

    return (
        <Fragment>
            <HashRouter>
                <Navbar isAuthenticated={isAuthenticated} onLogout={setIsAuthenticated} />
                <Switch>
                    <Route path="/beneficiaire" component={NewBeneficiaryPage} />
                    <Route
                        path="/login"
                        render={(props) => <LoginPage
                            isAuthenticated={isAuthenticated}
                            onLogin={setIsAuthenticated}
                        />}
                    />
                    <Route 
                        path="/" 
                        render={(props) => <HomePage
                            isAuthenticated={isAuthenticated}
                        />} 
                    />
                </Switch>
            </HashRouter>
        </Fragment>
    );
}

export default App;
