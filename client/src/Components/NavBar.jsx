import React, { useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"


const NavBar = ({ email, loggedIn, backendUrl }) => {

  const beneficiariesEndpoint = `${backendUrl}/api/beneficiaries`;
  const [searchTerm, setSearchTerm] = useState("");
  const [benefs, setBenefs] = useState("");
  const [matchList, setMatchList] = useState(null);
  const inputRef = useRef()

  // Je récupère la liste des benefs
  const getAllBenef = async () => {
    const config = {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem("token")}`
      }
    }
    const getAllBenefs = await axios.get(beneficiariesEndpoint, config)

    // J'assigne à la constante la liste des benefs
    setBenefs(getAllBenefs.data['hydra:member'])
  }

  const findMatches = (needle, hayStack) => {
    // Je filtre la liste des benefs avec le terme de recherche
    let findMatches = hayStack.filter((h) => {
      return needle === h.name
    })
    setMatchList(findMatches)

  }

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    findMatches(e.target.value, benefs)
  }

  const handleClick = () => {
    setSearchTerm("");
    setMatchList(null);
    inputRef.current.value = "";
  }

  useEffect(() => {
    getAllBenef();
  }, [])


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
              <div style={{ width: "200px" }}>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleInputChange} ref={inputRef} />
                {matchList ? (<div style={{ width: "200px", position: "absolute" }} aria-labelledby="navbarDropdown">
                  {matchList.map((match, index) => {
                    return (<Link key={index} className="custom-link" to={`/single/${match.name}`} onClick={handleClick}>
                      <div className="form-control me-2 custom-dropdown-item">{match.name}</div>
                    </Link>)

                  })}
                </div>) : null}
              </div>
              {/* <button className="btn btn-outline-info" type="submit">Rechercher</button> */}
            </form>) : null}
        </div>

      </div>


    </nav>
  )
}

export default NavBar
