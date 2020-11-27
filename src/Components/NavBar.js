import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'

export const NavBar = ({openLogin, openSignup}) => {

    return (
      <>
        <div className="navbar">
          <Link to={"/home"}>
            <span>Home</span>
          </Link>
          <Link to={"/explore"}>
            <span>Explore</span>
          </Link>
          <a onClick={openSignup}>Sign Up</a>
          <a onClick={openLogin}>Log In</a>
        </div>
      </>
    );
}

