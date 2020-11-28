import React from 'react'
import HaikuCard from './HaikuCard';
import './Home.css'

export const Home = ({currentUser, haikusFromFollowing}) => {
    return (
      <div className="feed">
        {haikusFromFollowing.map((haikuObj) => (
          <HaikuCard key={haikuObj.id} haiku={haikuObj} />
        ))}
      </div>
    );
}
