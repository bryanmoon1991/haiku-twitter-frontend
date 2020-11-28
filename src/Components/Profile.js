import React from 'react'

export const Profile = ({currentUser}) => {
    return (
        <div className="profile">
            <img src={currentUser.image} alt="profile-picture"/>
            <h3>{currentUser.username}</h3>
            <p>{currentUser.bio}</p>
        </div>
    )
}