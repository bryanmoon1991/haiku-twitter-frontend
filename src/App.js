import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { NavBar } from './Components/NavBar'
import { Welcome } from './Components/Welcome'
import { Signup } from './Components/Signup';
import { Login } from './Components/Login';
import { Home } from './Components/Home';
import { Profile } from './Components/Profile';
import { Explore } from './Components/Explore';
import { Favorites } from './Components/Favorites';
import { Following } from './Components/Following';
import { Followers } from './Components/Followers';
import './App.css'


class App extends Component {
  state = {
    user: null,
    userIndex: [],
    haikusFromFollowing: [],
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
            haikusFromFollowing: data.feed
          }, () => {console.log(this.state.user, this.state.haikusFromFollowing)});
        });
    } else {
      console.log("no user logged in")
      // this.props.history.push("/login")
      fetch('http://localhost:4000/api/v1/users')
        .then(response => response.json())
        .then(data => {
          let userArr = []
          data.map(user => userArr.push({
              id: user.id,
              username: user.username,
              bio: user.bio,
              image: user.image
            }))
          this.setState({ userIndex: userArr })
          console.log(userArr)
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
        this.setState({ user: data.user });
        localStorage.setItem("token", data.jwt);
      });
  };

  handleLogout = () => {
    console.log("logged out")
    localStorage.removeItem("token");
    this.setState({ user: null });

    // this.props.history.push("/"); dont know why this isnt working...but logout works just as it is
  };

  render() {

    return (
      <div className="main">
        {/* {this.state.user ? <Feed haikus={this.state.feed}/> : null } */}

        <NavBar />

        <Route
          path="/explore"
          render={() => (
            <Explore 
              userIndex={this.state.userIndex} 
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
                />
              )}
            />
            <Route 
              path="/profile" 
              render={() => (
                <Profile 
                  currentUser={this.state.user}
                />
              )} 
            />
            <Route path="/favorites" render={() => (
                <Favorites 
                  currentUser={this.state.user}
                />
              )} 
            />
            <Route path="/following" render={() => (
                <Following 
                  currentUser={this.state.user}
                />
              )} 
            />
            <Route path="/followers" render={() => (
                <Followers 
                  currentUser={this.state.user}
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