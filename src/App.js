import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { NavBar } from './Components/NavBar'
import { Welcome } from './Components/Welcome'
import { Signup } from './Components/Signup';
import { Login } from './Components/Login';
import { Home } from './Components/Home';
import { ProfileContainer } from './Components/ProfileContainer';
import { Explore } from './Components/Explore';
import './App.css'


class App extends Component {
  state = {
    user: null,
    userIndex: [],
    haikusFromFollowing: [],
    profile: null,
    profilesFavorites: [],
    showLogin: false,
    showSignup: false,
  };

  toggleLogin = () => {
    this.setState({ showLogin: !this.state.showLogin });
  };

  toggleSignup = () => {
    this.setState({ showSignup: !this.state.showSignup });
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:4000/api/v1/profile", {
        method: "GET",
        headers: { authorization: `Bearer ${token}` },
      })
        .then((r) => r.json())
        .then((data) => {
          // debugger
          this.setState({
            user: data.user,
            haikusFromFollowing: data.feed,
            userIndex: data.unfollowedUsers
          }, () => {console.log("CDM:", this.state)});
        });
    } else {
      console.log("no user logged in")
      // this.props.history.push("/login")
      fetch('http://localhost:4000/api/v1/users')
        .then(response => response.json())
        .then(data => {
          this.setState({ userIndex: data })
          console.log(data)
        });
    }
  }



  handleSignup = (user) => {
    fetch("http://localhost:4000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ user: user }),
    })
      .then((r) => r.json())
      .then((data) => { 
        this.setState({ user: data.user });
        localStorage.setItem("token", data.jwt);
      });
  };

  handleLogin = (userInfo) => {
    fetch("http://localhost:4000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ user: userInfo }),
    })
      .then((r) => r.json())
      .then((data) => {
        this.setState(
          {
            user: data.user,
            haikusFromFollowing: data.feed,
            userIndex: data.unfollowedUsers,
          }
        );
        console.log(this.state)
        localStorage.setItem("token", data.jwt);
      });
  };

  handleLogout = () => {
    console.log("logged out")
    localStorage.removeItem("token");
    this.setState({ user: null, haikusFromFollowing: [] });
    // this.props.history.push("/"); dont know why this isnt working...but logout works just as it is
  };


  getProfile = (id) => {
    this.setState({profile: null, profilesFavorites: []})

    fetch(`http://localhost:4000/api/v1/users/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log("in get profile:", data)
        this.setState({profile: data.user, profilesFavorites: data.favorites})
      });
  }


  render() {

    return (
      <div className="main">
        <NavBar currentUser={this.state.user} getProfile={this.getProfile} />

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
                haikusFromFollowing={this.state.haikusFromFollowing}
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
      </div>
    );
  }
}



export default App;