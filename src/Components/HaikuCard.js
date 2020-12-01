import React, { useState } from 'react'
import './HaikuCard.css'
import { Link } from 'react-router-dom'
import * as RiIcons from 'react-icons/ri';


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
      <div className="haiku-card">
        <img src={haiku.user.image} alt="profile Pic" />
        <div className="info">
          <h3>{haiku.user.name}</h3>
          <Link
            to={`/users/${haiku.user.id}`}
            onClick={() => getProfile(haiku.user.id)}
          >
            @{haiku.user.username}
          </Link>
          <p>{timeDisplay(haiku.created_at)}</p>
        </div>
        <div className="haiku">
          <p className="first">{haiku.first}</p>
          <p className="second">{haiku.second}</p>
          <p className="third">{haiku.third}</p>
        </div>
        {currentUser.id === haiku.user.id ? <button onClick={() => handleDeleteHaiku(haiku)}>Delete</button> : null}
        {currentUser ? (
          favorite ? (
            <RiIcons.RiHeart3Fill className="icon" onClick={handleFavorite} />
          ) : (
            <RiIcons.RiHeart3Line className="icon" onClick={handleFavorite} />
          )
        )
         : 
         null
         }
  
      </div>
    );
}



export default HaikuCard