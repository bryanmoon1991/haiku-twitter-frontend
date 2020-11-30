import React from 'react'
import { Link } from 'react-router-dom'
import './ProfileCard.css'

export const ProfileCard = ({user, getProfile}) => {
    return (
      <div className="profile-card">
        <img src={user.image} alt="avatar" />
        <div className="info">
          <h3 className="name">{user.name}</h3>
          <Link to={`/users/${user.id}`} onClick={() => getProfile(user.id)}>
            <p className="username">@{user.username}</p>
          </Link>
          <p className="bio">{user.bio}</p>
        </div>
          <div className="nav-links">
            <Link
              to={`/users/${user.id}/followers`}
              onClick={() => getProfile(user.id)}
            >
              Followers
            </Link>
            <Link
              to={`/users/${user.id}/following`}
              onClick={() => getProfile(user.id)}
            >
              Following
            </Link>
            <Link
              to={`/users/${user.id}/favorites`}
              onClick={() => getProfile(user.id)}
            >
              Favorites
            </Link>
          </div>
      </div>
    );
}
