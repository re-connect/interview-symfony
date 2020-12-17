import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css";
import UserContext from "../context/UserContext";

const backendUrl = "https://localhost:8000";
const loginEndpoint = `${backendUrl}/authentication_token`;

export default function Login() {
  const [userInfos, setUserInfos] = useState({
    email: "",
    password: "",
  });
  const user = useContext(UserContext);

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setUserInfos({ ...userInfos, [e.target.name]: e.target.value });
    console.log(userInfos);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(console.log(userInfos));
    const loginResponse = await axios.post(loginEndpoint, userInfos);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${loginResponse.data.token}`;
  };

  return (
    <div className="App">
      <div className="App-header">
        <div className="test-context">{user}</div>
        <div className="nav">
          <Link to={`/`}>
            <button className="btn back-btn">Back</button>
          </Link>
        </div>
        <h1>Bienvenue sur la page de connexion</h1>

        <form className="form login-form" onChange={handleChange}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" />
          </div>
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
