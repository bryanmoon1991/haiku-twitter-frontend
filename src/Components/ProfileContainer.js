import React from 'react'
import { Switch, Route } from 'react-router-dom';
import HaikuCard from './HaikuCard';
import { ProfileCard } from './ProfileCard'

export const ProfileContainer = ({ getProfile, profile , profilesFavorites}) => {
  return (
    <>
      {profile ? (
        <Switch>
          <Route
            path="/users/:id/favorites"
            render={() => {
              return (
                <div className="feed">
                    <ProfileCard user={profile} getProfile={getProfile} />
                    {profilesFavorites.map((haiku) => (
                    <HaikuCard key={haiku.id} haiku={haiku} />
                    ))}
                </div>
              );
            }}
          />
          <Route
            path="/users/:id/following"
            render={() => {
              return (
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
              );
            }}
          />
          <Route
            path="/users/:id/followers"
            render={() => {
              return (
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
              );
            }}
          />
          <Route
            path="/users/:id"
            render={() => {
              return (
                <div className="feed">
                    <ProfileCard user={profile} getProfile={getProfile} />
                    {profile.haikus.map((haiku) => (
                    <HaikuCard key={haiku.id} haiku={haiku} />
                    ))}
                </div>
              );
            }}
          />
        </Switch>
      ) : (
        <h2>Loading</h2>
      )}
    </>
  );
};
