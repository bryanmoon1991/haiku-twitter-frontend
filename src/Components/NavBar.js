import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'

const NavBar = ({openLogin, openSignup}) => {


  const handleClick = () => {
    console.log("Clicked")
  }


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

export default NavBar
