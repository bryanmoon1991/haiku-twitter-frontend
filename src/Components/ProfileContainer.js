import React from 'react'
import { Switch, Route } from 'react-router-dom';
import HaikuCard from './HaikuCard';
import { ProfileCard } from './ProfileCard'
import Loader from 'react-loader-spinner'

export const ProfileContainer = ({ getProfile, profile , profilesFavorites, currentUser, follow, unfollow, addFavorite, removeFavorite}) => {



  return (
    <>
      {profile ? (
        <Switch>
          <Route
            path="/users/:id/favorites"
            render={() => {
              return (
                <div className="feed">
                  <ProfileCard
                    follow={follow}
                    unfollow={unfollow}
                    currentUser={currentUser}
                    user={profile}
                    getProfile={getProfile}
                  />
                  {profilesFavorites.map((haiku) => (
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
            }}
          />
          <Route
            path="/users/:id/following"
            render={() => {
              // debugger
              return (
                <div className="feed">
                  <ProfileCard
                    follow={follow}
                    unfollow={unfollow}
                    currentUser={currentUser}
                    user={profile}
                    getProfile={getProfile}
                  />
                  {profile.followees.map((profile) => (
                    <ProfileCard
                      follow={follow}
                      unfollow={unfollow}
                      currentUser={currentUser}
                      key={profile.id}
                      user={profile}
                      getProfile={getProfile}
                    />
                  ))}
                </div>
              );
            }}
          />
          <Route
            path="/users/:id/followers"
            render={() => {
              return (
                <div className="feed">
                  <ProfileCard
                    follow={follow}
                    unfollow={unfollow}
                    currentUser={currentUser}
                    user={profile}
                    getProfile={getProfile}
                  />
                  {profile.followers.map((profileObj) => (
                    <ProfileCard
                      follow={follow}
                      unfollow={unfollow}
                      currentUser={currentUser}
                      key={profileObj.id}
                      user={profileObj}
                      getProfile={getProfile}
                    />
                  ))}
                </div>
              );
            }}
          />
          <Route
            path="/users/:id"
            render={() => {
              return (
                <div className="feed">
                  <ProfileCard
                    follow={follow}
                    unfollow={unfollow}
                    currentUser={currentUser}
                    user={profile}
                    getProfile={getProfile}
                  />
                  {profile.haikus.map((haiku) => (
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
            }}
          />
        </Switch>
      ) : (
        <div className="feed">
          <h2>Loading</h2>
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        </div>
      )}
    </>
  );
};
