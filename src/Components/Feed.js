import React from "react";
import { Switch, Route } from "react-router-dom";
import { Profile } from "./Profile"

import "./Feed.css"

export const Feed = ({currentUser}) => {

  console.log(currentUser)
  return (
    <div className="feed">
      <Switch>
        <Route to="/profile" render={ () => <Profile currentUser={currentUser} />}/>
      </Switch>
    </div>
  );
};

