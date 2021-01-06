import React, { useContext, useState } from "react";
import axios from "axios";
import "../App.css";
import { UserContext } from "../context/UserContext";
import Navbar from "./Navbar";

const backendUrl = "https://localhost:8000";
const loginEndpoint = `${backendUrl}/authentication_token`;

export default function Login() {
  const [userInfos, setUserInfos] = useState({
    email: "tester@gmail.com",
    password: "I@mTheT€ster",
  });
  const { currentUser, setCurrentUser, userToken, setUserToken } = useContext(
    UserContext
  );

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setUserInfos({ ...userInfos, [e.target.name]: e.target.value });
    console.log(userInfos);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userInfos);
    const loginResponse = await axios.post(loginEndpoint, userInfos);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${loginResponse.data.token}`;
    if (loginResponse && loginResponse.status === 200) {
      setCurrentUser(userInfos.email);
      setUserToken((prevState) => loginResponse.data.token);
      console.log(loginResponse.data.token);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="login-page">
        <h1>Bienvenue sur la page de connexion</h1>
        {currentUser ? (
          <h3>Vous êtes connecté :)</h3>
        ) : (
          <form className="form login-form" onChange={handleChange}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" defaultValue={userInfos.email} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                defaultValue={userInfos.password}
              />
            </div>
            <button
              type="submit"
              className="btn submit-btn"
              onClick={handleSubmit}
            >
              Se connecter
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
