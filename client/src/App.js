import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import NavBar from './Components/NavBar';
import Login from './Components/Login';
import Home from './Components/Home';
import Add from './Components/Add';
import Single from './Components/Single';

function App() {
  const backendUrl = 'http://127.0.0.1:8000';
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  return (
    <Router>
      <div className='App'>
        <NavBar email={email} loggedIn={loggedIn} backendUrl={backendUrl} />
        <Switch>
          <Route
            path='/login'
            render={() => (
              <Login
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                backendUrl={backendUrl}
              />
            )}
          />

          <Route
            path='/add'
            render={() =>
              loggedIn ? (
                <Add email={email} backendUrl={backendUrl} />
              ) : (
                <Redirect to='/login' />
              )
            }
          />

          <Route
            path='/single/:name'
            render={(props) =>
              loggedIn ? (
                <Single
                  {...props}
                  email={email}
                  password={password}
                  loggedIn={loggedIn}
                />
              ) : (
                <Redirect to='/login' />
              )
            }
          />

          <Route
            path='/'
            render={() =>
              loggedIn ? (
                <Home email={email} password={password} loggedIn={loggedIn} backendUrl={backendUrl} />
              ) : (
                <Redirect to='/login' />
              )
            }
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
