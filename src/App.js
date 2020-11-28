import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { NavBar } from './Components/NavBar'
import { Feed } from './Components/Feed'
import { Welcome } from './Components/Welcome'
import { Signup } from './Components/Signup';
import { Login } from './Components/Login';
import { Explore } from './Components/Explore'
import { Favorites } from './Components/Favorites'
import { Following } from './Components/Following'
import { Followers } from './Components/Followers'
import './App.css'


class App extends Component {
  state = {
    user: null,
    userIndex: [],
    showLogin: false,
    showSignup: false
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
        .then((user) => {
          // debugger
          this.setState({
            user: user,
          });
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
        <NavBar />
        <Feed currentUser={this.state.user} />
        <Welcome
          currentUser={this.state.user}
          toggleLogin={this.toggleLogin}
          toggleSignup={this.toggleSignup}
          handleLogout={this.handleLogout}
        />
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
        <Switch>
          <Route to="/explore" render={()=> <Explore/>} />
          <Route to="/favorites" render={()=> <Favorites/>} />
          <Route to="/following" render={()=> <Following/>} />
          <Route to="/followers" render={()=> <Followers/>} />
        </Switch>
      </div>
    );
  }
}



export default App;