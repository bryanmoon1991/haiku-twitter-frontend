import React from 'react'
import { Link } from 'react-router-dom'
import * as RiIcons from 'react-icons/ri'
import './NavBar.css'

export const NavBar = ({openLogin, openSignup}) => {

    return (
      <>
        <div className="navbar">
          <Link to={"/home"}>
            <span>{ <RiIcons.RiHome7Line/> }  Home</span>
          </Link>
          <Link to={"/explore"}>
            <span>{ <RiIcons.RiBubbleChartLine/> }  Explore</span>
          </Link>
          <Link to={"/profile"}>
            <span>{ <RiIcons.RiUserLine/> }  Profile</span>
          </Link>

        </div>
      </>
    );
}

