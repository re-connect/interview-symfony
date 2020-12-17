import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import { UserContext } from "./context/UserContext";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const UserContextValue = {
    currentUser,
    setCurrentUser,
    userToken,
    setUserToken,
  };

  return (
    <UserContext.Provider value={UserContextValue}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
      </Switch>
    </UserContext.Provider>
  );
}
