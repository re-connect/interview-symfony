import React from 'react'
import {Link} from "react-router-dom"

const NavBar = ({email, loggedIn}) => {
    return (
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">     
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
      <li className="nav-item px-2">
          <Link to="/">Re-connect
          </Link>
        </li>
        <li className="nav-item px-2">
          <Link to="/login">Login
          </Link>
        </li>
                {loggedIn ?  (
                  <>
        <li className="nav-item px-2">
          <Link to="/add">Ajouter Bénéficiaire
          </Link>
        </li>
<li>
          <h6>Hello {email}</h6>
        </li>
        </>) : null }

      </ul>
    </div>
  </div>
</nav>        
    )
}

export default NavBar
