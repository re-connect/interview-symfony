import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = (props) => {
    return (
        <ul className="navigation">
            <li><NavLink to="/login" className="button">Connexion</NavLink></li>
            <li><NavLink to="#" className="button">Deconnexion</NavLink></li>
        </ul>
    );
}

export default Navbar;