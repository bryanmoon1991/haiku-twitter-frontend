import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import * as RiIcons from 'react-icons/ri'
import './ProfileCard.css'

export const ProfileCard = ({user, getProfile, unfollow, follow, currentUser}) => {
  
  

  const handleFollow = () => {
    setFollowed(!followed)
    followed ? unfollow(user.id) : follow(user.id)
  }

  const followedState = () => {
    if (currentUser){
      let found = currentUser.followees.find(userObj => userObj.id === user.id)
      if (found) {
          return true
      } else {
          return false
      }
    }else{
      return false
    }
  }
  let [followed, setFollowed] = useState(followedState)
  
    return (
      <div className="profile-card">
        <img src={user.image} alt="avatar" />
        <div className="info">
        <Link to={`/users/${user.id}`} onClick={() => getProfile(user.id)}>
          <h3 className="name">{user.name}</h3>
        </Link>

          <Link to={`/users/${user.id}`} onClick={() => getProfile(user.id)}>
            <p className="username">@{user.username}</p>
          </Link>
          <p className="bio">{user.bio}</p>
        </div>
        {currentUser ? (
            currentUser.id === user.id ? null : followed ? (
              <button onClick={handleFollow} className="following-button"> 
                <span>
                Following
                </span>
              </button>
            ) : (
              <button onClick={handleFollow} className="follow-button">
                <RiIcons.RiUserAddLine className="follow-icon" />
                Follow
              </button>
            )
          ) : null}
        <div className="nav-links">
          <Link
            to={`/users/${user.id}/followers`}
            onClick={() => getProfile(user.id)}
          >
            {user.followers
              ? `Followers: ${user.followers.length}`
              : 'Followers'}
          </Link>
          <Link
            to={`/users/${user.id}/following`}
            onClick={() => getProfile(user.id)}
          >
            {user.followees
              ? `Following: ${user.followees.length}`
              : 'Following'}
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
