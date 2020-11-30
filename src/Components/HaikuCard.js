import React, { useState } from 'react'
import './HaikuCard.css'
import { Link } from 'react-router-dom'
const HaikuCard = ({ haiku, getProfile, currentUser, addFavorite, removeFavorite }) => {


    const favoriteBtnHandler = () => {
        setFavorite(!favorite)
        favorite ? removeFavorite(haiku.id) : addFavorite(haiku.id)
    }

    const favoriteState = () => {
        let found = currentUser.favorites.find(haikuObj => haikuObj.haiku.id === haiku.id)
        if (found) {
            return true
        } else {
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
        </div>
        <div className="haiku">
          <p className="first">{haiku.first}</p>
          <p className="second">{haiku.second}</p>
          <p className="third">{haiku.third}</p>
        </div>
        <button onClick={favoriteBtnHandler}>{favorite ? "Unfavorite" : "Favorite"}</button>
      </div>
    );
}



export default HaikuCard