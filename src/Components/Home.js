import React from 'react'
import HaikuCard from './HaikuCard';
import './Home.css'

export const Home = ({currentUser, haikusFromFollowing}) => {
    return (
      <div className="feed">
        {haikusFromFollowing.map((haiku) => (
          <HaikuCard key={haiku.id} haiku={haiku} />
        ))}
      </div>
    );
}
