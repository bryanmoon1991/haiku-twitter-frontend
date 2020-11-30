import React from 'react'
import HaikuCard from './HaikuCard';
import './Home.css'

export const Home = ({currentUser, feed, getProfile, addFavorite, removeFavorite}) => {
    feed.sort((a,b) => {
      if (a.created_at > b.created_at) return -1;
      if (a.created_at < b.created_at) return 1;
      return 0;
    })
    return (
      <div className="feed">
        {feed.map((haiku) => (
          <HaikuCard
            key={haiku.id}
            haiku={haiku}
            getProfile={getProfile}
            currentUser={currentUser}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
          />
        ))}
      </div>
    );
}
