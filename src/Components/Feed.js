import React from "react";
import HaikuCard from './HaikuCard'
import "./Feed.css"

export const Feed = ({haikus}) => {

  return (
    <div className="feed">

        {haikus.map(haikuObj => <HaikuCard key={haikuObj.id} haiku={haikuObj}/>)}

    </div>
  );
};