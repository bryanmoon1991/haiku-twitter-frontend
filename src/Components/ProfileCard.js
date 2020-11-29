import React from 'react'
import { Link } from 'react-router-dom'

export const ProfileCard = ({user, getProfile}) => {
    return (
        <div className="profile-card">
            <img src={user.image} alt="profile-picture"/>
            <h3>{user.username}</h3>
            <p>{user.bio}</p>
            <div>
                <Link to={`/users/${user.id}/followers`} onClick={() => getProfile(user.id) }>Followers</Link>
                <Link to={`/users/${user.id}/following`} onClick={() => getProfile(user.id) }>Following</Link>
                <Link to={`/users/${user.id}/favorites`} onClick={() => getProfile(user.id) }>Favorites</Link>
            </div>
        </div>
    )
}
