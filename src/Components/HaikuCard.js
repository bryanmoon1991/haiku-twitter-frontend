import React, { useState } from 'react'
import './HaikuCard.css'
import { Link } from 'react-router-dom'
import * as RiIcons from 'react-icons/ri';
// import * as GrIcons from 'react-icons/gr'
import { BsFillClockFill } from "react-icons/bs";
import { IoTrashOutline } from 'react-icons/io5'


const HaikuCard = ({ haiku, getProfile, currentUser, addFavorite, removeFavorite, handleDeleteHaiku }) => {


  
  const timeDisplay = (time) => {
    const dayjs = require('dayjs')
    var relativeTime = require('dayjs/plugin/relativeTime')
    dayjs.extend(relativeTime)
 
    return dayjs(time).fromNow()
    
  }

    const handleFavorite = () => {
        setFavorite(!favorite)
        favorite ? removeFavorite(haiku.id) : addFavorite(haiku.id)
    }

    const favoriteState = () => {
        if (currentUser){
            let found = currentUser.favorites.find(haikuObj => haikuObj.haiku.id === haiku.id)
            if (found) {
                return true
            } else {
                return false
            }
        }else{
            return false
        }
    }
    let[favorite, setFavorite] = useState(favoriteState) 
    // 
    // return currentUser.favorites.includes(haiku) ? setFavorite(true) : false
    return (
      <>
      {haiku ? 
      
      (<div className="haiku-card">
        <img src={haiku.user.image} alt="profile Pic" />
        <div className="haiku-info">
          <h3>{haiku.user.name}</h3>
          <Link
            to={`/users/${haiku.user.id}`}
            onClick={() => getProfile(haiku.user.id)}
          >
            @{haiku.user.username}
          </Link>
          <p><BsFillClockFill className="clock"/> {timeDisplay(haiku.created_at)}</p>
        </div>
        <div className="haiku">
          <p className="first">{haiku.first}</p>
          <p className="second">{haiku.second}</p>
          <p className="third">{haiku.third}</p>
        </div>
        
        {currentUser ? (
          <span className="user-icons">
          {currentUser.id === haiku.user.id ? <IoTrashOutline className="icon" onClick={() => handleDeleteHaiku(haiku)}/> : null}
          {favorite ? (
            
            <RiIcons.RiHeart3Fill className="icon" onClick={handleFavorite} />
            
          ) : (
            <RiIcons.RiHeart3Line className="icon" onClick={handleFavorite} />
          )}
          </span>
        )
         : 
         null
         }
  
      </div>)

      : 
         (<div className="haiku-card"><h3>Loading...</h3></div>)
      
    }
      </>
    );
}



export default HaikuCard