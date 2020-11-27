import React from 'react'
import * as RiIcons from "react-icons/ri";
import './Welcome.css'

export const Welcome = ({toggleSignup, toggleLogin, currentUser, handleLogout}) => {

    return (
      <>
            {currentUser ? 
                (
                    <div className="welcome">
                        <h2>Welcome {currentUser.username}</h2>
                        <a onClick={handleLogout}>Logout</a>
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

