import React from 'react'
import { Link } from 'react-router-dom'
import * as RiIcons from 'react-icons/ri'
import './NavBar.css'

export const NavBar = ({currentUser, getProfile}) => {

    return (
      <>
        <div className="navbar">
          <Link to={"/home"}>
            <span>{ <RiIcons.RiHome7Line/> }  Home</span>
          </Link>
          <Link to={"/explore"}>
            <span>{ <RiIcons.RiBubbleChartLine/> }  Explore</span>
          </Link>
          {currentUser ? 
          <Link to={`/users/${currentUser.id}`} onClick={ ()=> getProfile(currentUser.id) }>
            <span>{ <RiIcons.RiUserLine/> }  Profile</span>
          </Link>
          : null
          }

        </div>
      </>
    );
}

