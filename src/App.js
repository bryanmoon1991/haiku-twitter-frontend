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
        this.setState({ user: data.user });
        localStorage.setItem('token', data.jwt);
        this.props.history.push('/explore');
      });
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
        this.setState({
          user: data.user,
          feed: data.feed,
          userIndex: data.unfollowedUsers,
        });
        console.log(this.state);
        localStorage.setItem('token', data.jwt);
        this.props.history.push('/home');
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
          profilesFavorites: data.favorites,
        });
      });
  };

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