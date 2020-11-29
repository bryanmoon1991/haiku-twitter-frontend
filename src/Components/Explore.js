import React from 'react'
import {ProfileCard} from './ProfileCard'

export const Explore = ({currentUser, userIndex, getProfile}) => {
    return (
      <>
        {currentUser ? (
          <div className="feed">
            {userIndex.filter(user => user.id !== currentUser.id).map(user => <ProfileCard key={user.id} user={user} getProfile={getProfile}/>)}
          </div>
        ) : (
          <div className="feed">
            {userIndex.map(user => <ProfileCard key={user.id} user={user} getProfile={getProfile}/>)}
          </div>
        )}
      </>
    );
}
