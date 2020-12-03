import React from 'react'
import * as RiIcons from "react-icons/ri";
import './Welcome.css'

export const Welcome = ({toggleSignup, toggleLogin, toggleEditProfile, currentUser, handleLogout}) => {

    return (
      <>
        {currentUser ? (
          <div className="welcome">
            <h3>Welcome {currentUser.name}</h3>
            <button className="nav-link-button" onClick={handleLogout}>
              Logout
            </button>
            <button className="nav-link-button" onClick={toggleEditProfile}>
              Edit Profile
            </button>
          </div>
        ) : (
          <div className="welcome">
            <button className="nav-link-button" onClick={toggleSignup}>
              {<RiIcons.RiArrowRightSLine />} Sign Up
            </button>
            <button className="nav-link-button" onClick={toggleLogin}>
              {<RiIcons.RiArrowRightSLine />} Log In
            </button>
          </div>
        )}
      </>
    );
}

