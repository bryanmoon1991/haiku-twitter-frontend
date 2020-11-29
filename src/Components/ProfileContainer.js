import React from 'react'
import { Switch, Route } from 'react-router-dom';
import HaikuCard from './HaikuCard';
import { ProfileCard } from './ProfileCard'

export const ProfileContainer = ({ userIndex, getProfile, profile , profilesFavorites}) => {
  return (
    //    current user must always be in the userIndex or this function will not work
    // ie. if we remove the current user from the index on the backend (for the explore page), we will never be able to render the current users profile
    <>
      {userIndex === 0 ? (
        <h2>Loading</h2>
      ) : (
        <Switch>
          <Route
            path="/users/:id/favorites"
            render={() => {
              return (
                <>
                  {profile ? (
                    <div className="feed">
                      <ProfileCard user={profile} getProfile={getProfile} />
                      {profilesFavorites.map((haiku) => (
                        <HaikuCard key={haiku.id} haiku={haiku} />
                      ))}
                    </div>
                  ) : (
                    <h2>Loading Profile</h2>
                  )}
                </>
              );
            }}
          />
          <Route
            path="/users/:id/following"
            render={() => {
              return (
                <>
                  {profile ? (
                    <div className="feed">
                      <ProfileCard user={profile} getProfile={getProfile} />
                      {profile.followees.map((profile) => (
                        <ProfileCard
                          key={profile.id}
                          user={profile}
                          getProfile={getProfile}
                        />
                      ))}
                    </div>
                  ) : (
                    <h2>Loading Profile</h2>
                  )}
                </>
              );
            }}
          />
          <Route
            path="/users/:id/followers"
            render={() => {
              return (
                <>
                  {profile ? (
                    <div className="feed">
                      <ProfileCard user={profile} getProfile={getProfile} />
                      {profile.followers.map((profile) => (
                        <ProfileCard
                          key={profile.id}
                          user={profile}
                          getProfile={getProfile}
                        />
                      ))}
                    </div>
                  ) : (
                    <h2>Loading Profile</h2>
                  )}
                </>
              );
            }}
          />
          <Route
            path="/users/:id"
            render={({ match }) => {
              // dont need to match because the link to a profile will do a get request and pass in the profile

              // let id = parseInt(match.params.id)
              // let foundUser = userIndex.find(user => user.id === id)
              return (
                <>
                  {profile ? (
                    <div className="feed">
                      <ProfileCard user={profile} getProfile={getProfile} />
                      {profile.haikus.map((haiku) => (
                        <HaikuCard key={haiku.id} haiku={haiku} />
                      ))}
                    </div>
                  ) : (
                    <h2>Loading Profile</h2>
                  )}
                </>
              );
            }}
          />
        </Switch>
      )}
    </>
  );
};
