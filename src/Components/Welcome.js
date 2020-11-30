import React from 'react'
import * as RiIcons from "react-icons/ri";
import './Welcome.css'

export const Welcome = ({toggleSignup, toggleLogin, toggleEditProfile, currentUser, handleLogout}) => {

    return (
      <>
            {currentUser ? 
                (
                    <div className="welcome">
                        <h3>Welcome {currentUser.username}</h3>
                        <a onClick={handleLogout}>Logout</a>
                        <a onClick={toggleEditProfile}>Edit Profile</a>
                    </div>
                )
            :
                (
                    <div className="welcome">
                        <a onClick={toggleSignup}>{ <RiIcons.RiArrowRightSLine /> } Sign Up</a>
                        <a onClick={toggleLogin}>{ <RiIcons.RiArrowRightSLine /> } Log In</a>
                    </div >
                )
            }
      </>
    );
}

