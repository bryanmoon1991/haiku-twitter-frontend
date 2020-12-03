import React, {useState} from 'react'
import {ProfileCard} from './ProfileCard'
import './Explore.css'
import Loader from 'react-loader-spinner';
export const Explore = ({currentUser, userIndex, getProfile, follow, unfollow }) => {

  const initialState = {
    query: ''
  };

  let [{ query }, setState] = useState(initialState);

  const handleChange = (event) => {
    setState({query: event.target.value});
  };

  const filteredIndex = () => {
    if (userIndex.length === 0) {
      console.log("loading")
    } else {
      return userIndex.filter(userObj => {
        return userObj.username.toLowerCase().includes(query.toLowerCase()) || userObj.name.toLowerCase().includes(query.toLowerCase())
      });
    }
  }

    return (
      <>
        {userIndex.length === 0 ? 
        
        <div className="feed" id='loading'>
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        </div>
         :
          (currentUser ? (
            <>
            <form  className="search">
             <input
                placeholder="Enter your search"
                type="text"
                name="search"
                value={query}
                onChange={handleChange}
              /> 
            </form>
            <div className="feed">
              {filteredIndex().filter(user => user.id !== currentUser.id).map(user => <ProfileCard follow={follow} unfollow={unfollow} currentUser={currentUser} key={user.id} user={user} getProfile={getProfile}/>)}
            </div>
            </>
          ) : (
            <div className="feed">
              {filteredIndex().map(user => <ProfileCard follow={follow} unfollow={unfollow} currentUser={currentUser} key={user.id} user={user} getProfile={getProfile}/>)}
            </div>
          ))
        }
      </>
    );
}
