import React from 'react'
import * as RiIcons from "react-icons/ri";
import './Welcome.css'

export const Welcome = ({toggleSignup, toggleLogin}) => {

    return (
      <>
        <div className="welcome">
          <a onClick={toggleSignup}>{ <RiIcons.RiArrowRightSLine /> } Sign Up</a>
          <a onClick={toggleLogin}>{ <RiIcons.RiArrowRightSLine /> } Log In</a>
        </div>
      </>
    );
}

