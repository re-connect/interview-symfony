import React, { useState, useRef } from 'react'
import { Link } from "react-router-dom"


const NavBar = ({ email, loggedIn, registeredBeneficiaries }) => {

  const [searchTerm, setSearchTerm] = useState("");
  const [matchList, setMatchList] = useState(null);
  const inputRef = useRef()


  const findMatches = (needle, hayStack) => {
    // Je filtre la liste des benefs avec le terme de recherche
    let findMatches = hayStack.filter((h) => {
      return needle === h.name
    })

    setMatchList(findMatches)
  }

  const handleInputChange = (e) => {
    // A chaque évènement onChange, je set le state searchTerm avec l'event target value, puis j'appelle ma fonction findMatches
    setSearchTerm(e.target.value);
    findMatches(e.target.value, registeredBeneficiaries)
  }

  const handleClick = () => {
    // Au click sur une des div, je reset les values
    setSearchTerm("");
    setMatchList(null);
    inputRef.current.value = "";
  }


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
            {loggedIn ? null : (
              <li className="nav-item px-2">
                <Link to="/login">Login
            </Link>
              </li>)}

            {loggedIn ? (
              <>
                <li className="nav-item px-2">
                  <Link to="/add">Ajouter Bénéficiaire
            </Link>
                </li>
                <li className="nav-item px-2">
                  <h6>Hello {email}</h6>
                </li>
              </>) : null}
          </ul>
          {loggedIn ? (
            <form className="d-flex">
              <div style={{ width: "200px", margin: "0 auto" }}>
                <input className="form-control me-2" type="search" placeholder="Tapez un nom" aria-label="Search" onChange={handleInputChange} ref={inputRef} />
                {matchList && (<div style={{ width: "200px", position: "absolute" }} aria-labelledby="navbarDropdown">
                  {matchList.map((match, index) => {
                    return (<Link key={index} className="custom-link" to={`/single/${match.name}`} onClick={handleClick}>
                      <div className="form-control me-2 custom-dropdown-item">{match.name}</div>
                    </Link>)
                  })}
                </div>)}
              </div>
            </form>) : null}
        </div>

      </div>


    </nav>
  )
}

export default NavBar
