import React from 'react'
import './HaikuCard.css'
import { Link } from 'react-router-dom'
const HaikuCard = ({ haiku, getProfile }) => {

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
      </div>
    );
}


export default HaikuCard