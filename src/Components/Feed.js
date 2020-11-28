import React from "react";
import { Switch, Route } from "react-router-dom";
import { Profile } from "./Profile"
import HaikuCard from './HaikuCard'
import "./Feed.css"


export const Feed = ({currentUser, haikus}) => {

  return (
    <div className="feed">
        {haikus.map(haikuObj => <HaikuCard key={haikuObj.id} haiku={haikuObj}/>)}
    </div>
  );
};

