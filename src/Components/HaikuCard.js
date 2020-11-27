import React from 'react'
import './HaikuCard.css'
const HaikuCard = ({ haiku }) => {

    return(
        <div className='haiku-card'>
            <img src="https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?b=1&k=6&m=1214428300&s=612x612&w=0&h=kMXMpWVL6mkLu0TN-9MJcEUx1oSWgUq8-Ny6Wszv_ms=" alt='profile Pic'/>
            <h4>{haiku.user.username}</h4>
            <p>{haiku.first}</p>
            <p>{haiku.second}</p>
            <p>{haiku.third}</p>
        </div>
    )
}


export default HaikuCard