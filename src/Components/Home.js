import React from 'react'
import HaikuCard from './HaikuCard';
import './Home.css'

export const Home = ({currentUser, feed, getProfile}) => {
    return (
      <div className="feed">
        {feed.map((haiku) => (
          <HaikuCard
            key={haiku.id}
            haiku={haiku}
            getProfile={getProfile}
          />
        ))}
      </div>
    );
}
