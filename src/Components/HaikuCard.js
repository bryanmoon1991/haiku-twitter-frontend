import React from 'react'
import './HaikuCard.css'
import { Link } from 'react-router-dom'
const HaikuCard = ({ haiku, getProfile }) => {

    return(
        <div className='haiku-card'>
            {/* <img src={haiku.user.image} alt='profile Pic'/> */}
            <Link to={`/users/${haiku.user.id}`} onClick={() => getProfile(haiku.user.id) }><h4>{haiku.user.username}</h4></Link>
            <p>{haiku.first}</p>
            <p>{haiku.second}</p>
            <p>{haiku.third}</p>
        </div>
    )
}


export default HaikuCard