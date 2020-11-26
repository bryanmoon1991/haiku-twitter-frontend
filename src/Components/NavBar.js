import React from 'react'
import { Link } from 'react-router-dom'
// import './NavBar.css'

function NavBar() {
    return (
      <>
        <div className="navbar">
              <Link to={"/home"}>
                <span>Home</span>
              </Link>
              <Link to={"/explore"}>
                <span>Explore</span>
              </Link>
              <Link to={"/signup"}>
                <span>Sign Up</span>
              </Link>
              <Link to={"/login"}>
                <span>Log In</span>
              </Link>
        </div>
      </>
    );
}

export default NavBar
