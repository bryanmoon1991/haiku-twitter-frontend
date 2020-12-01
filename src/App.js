import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { NavBar } from './Components/NavBar'
import { Welcome } from './Components/Welcome'
import { Signup } from './Components/Signup';
import { Login } from './Components/Login';
import { Compose } from './Components/Compose';
import { EditProfile } from './Components/EditProfile';
import { Home } from './Components/Home';
import { ProfileContainer } from './Components/ProfileContainer';
import { Explore } from './Components/Explore';
import './App.css'


class App extends Component {
  state = {
    user: null,
    userIndex: [],
    feed: [],
    profile: null,
    profilesFavorites: [],
    showLogin: false,
    showSignup: false,
    showCompose: false,
    showEditProfile: false,
    favoriteInstances: [],
  };

  toggleLogin = () => {
    this.setState({ showLogin: !this.state.showLogin });
  };

  toggleSignup = () => {
    this.setState({ showSignup: !this.state.showSignup });
  };

  toggleCompose = () => {
    this.setState({ showCompose: !this.state.showCompose });
  };

  toggleEditProfile = () => {
    this.setState({ showEditProfile: !this.state.showEditProfile });
  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:4000/api/v1/profile', {
        method: 'GET',
        headers: { authorization: `Bearer ${token}` },
      })
        .then((r) => r.json())
        .then((data) => {
          // debugger
          this.setState(
            {
              user: data.user,
              feed: data.feed,
              userIndex: data.unfollowedUsers,
            },
            () => {
              console.log('CDM:', this.state);
            }
          );
        });
    } else {
      Promise.all([
        fetch('http://localhost:4000/api/v1/users'),
        fetch('http://localhost:4000/api/v1/haikus'),
      ])
        .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
        .then(([data1, data2]) =>
          this.setState(
            {
              userIndex: data1,
              feed: data2,
            },
            () => {
              console.log('no user logged in');
              console.log('non-user CDM:', this.state);
            }
          )
        );
    }
  }

  handleSignup = (user) => {
    fetch('http://localhost:4000/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ user: user }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.error){
          alert(data.error)
        }else{
          this.setState({ user: data.user });
          localStorage.setItem('token', data.jwt);
          this.props.history.push('/explore');
        }
      })
  };

  handleLogin = (userInfo) => {
    fetch('http://localhost:4000/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ user: userInfo }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.message){
          alert(data.message)
          this.setState({
            feed: data.feed,
            userIndex: data.userIndex,
          });
         
        }else{

          this.setState({
            user: data.user,
            feed: data.feed,
            userIndex: data.unfollowedUsers,
          });
         
          localStorage.setItem('token', data.jwt);
          this.props.history.push('/home');
        }
      });
  };

  createHaiku = (haiku) => {
    fetch('http://localhost:4000/api/v1/haikus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        user_id: this.state.user.id,
        first: haiku.first,
        second: haiku.second,
        third: haiku.third,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        this.getProfile(this.state.user.id)
        this.props.history.push(`/users/${this.state.user.id}`);
      });
  };

  handleLogout = () => {
    console.log('logged out');
    localStorage.removeItem('token');
    this.setState({ user: null, feed: [] }, () => {
      this.props.history.push('/explore');
    });
  };

  getProfile = (id) => {
    this.setState({ profile: null, profilesFavorites: [] });

    fetch(`http://localhost:4000/api/v1/users/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('in get profile:', data);
        this.setState({
          profile: data.user,
          profilesFavorites: data.favorites
        });
      });
  };

  //test
  editProfile = (user) => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:4000/api/v1/users/${this.state.user.id}`,{
            method: "PATCH",
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(r => r.json())
        .then(user => {
          console.log(user)
          this.setState({user: user})
          this.getProfile(user.id)
          this.props.history.push(`/users/${user.id}`)

        })
  }

  handleDeleteHaiku = (haiku) => {
    fetch(`http://localhost:4000/api/v1/haikus/${haiku.id}`,{
      method: 'DELETE'
    }).then(resp => resp.json()).then(() => {
      const userCopy = this.state.user
      const index = userCopy.haikus.indexOf(haiku)
      userCopy.haikus.splice(index, 1)
      this.setState({user: userCopy}, () => {
        this.getProfile(this.state.user.id)
        this.props.history.push(`/users/${this.state.user.id}`)
      })
    })
  }
  addFavorite = (haikuID) => {
    fetch("http://localhost:4000/api/v1/favorites", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({
        haiku_id: haikuID,
        user_id: this.state.user.id
      })
    }).then(resp => resp.json()).then((data) => {
      let userCopy = this.state.user
      userCopy.favorites.push(data)
      this.setState({user: userCopy})
    })
  }

  removeFavorite = (haikuID) => {
    let fav = this.state.user.favorites.find(favObj => favObj.haiku.id === haikuID)
    fetch(`http://localhost:4000/api/v1/favorites/${fav.id}`, {
      method: 'DELETE'
    }).then(resp => resp.json()).then((data) => {
      let userCopy = this.state.user 
      let deletedFav = userCopy.favorites.indexOf(fav)
      userCopy.favorites.splice(deletedFav, 1)
      this.setState({user: userCopy})
    })
  }

  follow = (userID) => {
  
      fetch("http://localhost:4000/api/v1/relationships", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accepts': 'application/json'
        },
        body: JSON.stringify({
          follower_id: this.state.user.id,
          followee_id: userID
        })
      }).then(resp => resp.json()).then((data) => {
        let userCopy = this.state.user
        let newFollowee = this.state.userIndex.find(userObj => userObj.id === userID)
        userCopy.followees.push(newFollowee)
        userCopy.followed_users.push(data)
        this.setState({user: userCopy}, () => {
          console.log("follow:", this.state.user.followed_users, this.state.user.followees)
        })
      })
  }

  unfollow = (userID) => {
    let relationship = this.state.user.followed_users.find(rel => rel.followee_id === userID)
    fetch(`http://localhost:4000/api/v1/relationships/${relationship.id}`, {
      method: 'DELETE'
    }).then(resp => resp.json()).then((data) => {
      let userCopy = this.state.user 
      let indexOfRelationship = userCopy.followed_users.indexOf(relationship)
      userCopy.followed_users.splice(indexOfRelationship, 1)
      let unfollowedUser = userCopy.followees.find(userObj => userObj.id === userID)
      let indexOfUser = userCopy.followees.indexOf(unfollowedUser)
      userCopy.followees.splice(indexOfUser, 1)

      if (this.state.userIndex.includes(unfollowedUser)) {
        console.log("already in index of non-followed") 
        
        this.setState({user: userCopy}, () => {
          console.log(
            'unfollow:',
            this.state.user.followed_users,
            this.state.user.followees,
            data
          );
        })
  
      } else {
        this.setState({
          user: userCopy,
          userIndex:[...this.state.userIndex, unfollowedUser]
        }, () => {
          console.log(
            'unfollow:',
            this.state.user.followed_users,
            this.state.user.followees,
            data
          );
        })
      } 
    })
  }


  render() {
    return (
      <div className="main">
        <NavBar
          currentUser={this.state.user}
          getProfile={this.getProfile}
          toggleCompose={this.toggleCompose}
        />

        <Route
          path="/explore"
          render={() => (
            <Explore
              currentUser={this.state.user}
              userIndex={this.state.userIndex}
              getProfile={this.getProfile}
              follow={this.follow}
              unfollow={this.unfollow}
            />
          )}
        />

        <Switch>
          <Route
            path="/home"
            render={() => (
              <Home
                currentUser={this.state.user}
                feed={this.state.feed}
                getProfile={this.getProfile}
                addFavorite={this.addFavorite}
                removeFavorite={this.removeFavorite}
              />
            )}
          />
          <Route
            path="/users"
            render={() => (
              <ProfileContainer
                userIndex={this.state.userIndex}
                profile={this.state.profile}
                profilesFavorites={this.state.profilesFavorites}
                getProfile={this.getProfile}
                currentUser={this.state.user}
                follow={this.follow}
                unfollow={this.unfollow}
                addFavorite={this.addFavorite}
                removeFavorite={this.removeFavorite}
                handleDeleteHaiku={this.handleDeleteHaiku}
              />
            )}
          />
        </Switch>

        <Welcome
          currentUser={this.state.user}
          toggleLogin={this.toggleLogin}
          toggleSignup={this.toggleSignup}
          handleLogout={this.handleLogout}
          toggleEditProfile={this.toggleEditProfile}
        />

        {/* Modals */}
        <Signup
          showSignup={this.state.showSignup}
          toggleSignup={this.toggleSignup}
          handleSignup={this.handleSignup}
        />
        <Login
          showLogin={this.state.showLogin}
          toggleLogin={this.toggleLogin}
          handleLogin={this.handleLogin}
        />
        <Compose
          toggleCompose={this.toggleCompose}
          showCompose={this.state.showCompose}
          createHaiku={this.createHaiku}
        />
        {this.state.user ?
        <EditProfile
          toggleEditProfile={this.toggleEditProfile}
          showEditProfile={this.state.showEditProfile}
          editProfile={this.editProfile}
          currentUser={this.state.user}
        /> :
        null
        }
      </div>
    );
  }
}



export default withRouter(App);