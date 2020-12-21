import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Navbar() {
  const { currentUser, setCurrentUser, setUserToken } = useContext(UserContext);

  return (
    <nav className="nav">
      <Link to={"/"}>
        <p>Accueil</p>
      </Link>
      {currentUser ? (
        <Fragment>
          <div className="flex-col">
            <p style={{ fontStyle: "italic" }}>
              Connecté en tant que: {currentUser}
            </p>
          </div>
          <button
            className="btn"
            onClick={() => {
              setCurrentUser(null);
              setUserToken(null);
            }}
          >
            Se déconnecter
          </button>
        </Fragment>
      ) : (
        <Fragment>
          <Link to={"/login"}>
            <button className="btn login-btn">Connexion</button>
          </Link>
        </Fragment>
      )}
    </nav>
  );
}
