import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Navbar() {
  const { currentUser, setCurrentUser, setUserToken } = useContext(UserContext);

  return (
    <nav className="nav">
      <Link to={"/"}>
        <p>Home</p>
      </Link>
      {currentUser ? (
        <Fragment>
          <div className="flex-col">
            <p style={{ fontStyle: "italic" }}>Connected as: {currentUser}</p>
          </div>
          <button
            className="btn"
            onClick={() => {
              setCurrentUser(null);
              setUserToken(null);
            }}
          >
            Log out
          </button>
        </Fragment>
      ) : (
        <Fragment>
          <Link to={"/login"}>
            <button className="btn login-btn">Log in</button>
          </Link>
        </Fragment>
      )}
    </nav>
  );
}
