import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { NavBar } from './Components/NavBar'
import Home from './Components/Home'
import { Signup } from './Components/Signup';
import { Login } from './Components/Login';
import './App.css'


class App extends Component {
  state = {
    user: null,
    showLogin: false,
    showSignup: false
  };

  openLogin = () => {
    this.setState({ showLogin: !this.state.showLogin });
  };

  openSignup = () => {
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
        .then((data) => this.setState({ user: data.user }));
    } else {
      // this.props.history.push("/login")
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
      .then((data) => { });
    
    this.setState({ user: data.user });
    localStorage.setItem("token", data.jwt);
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
    localStorage.removeItem("token");
    this.setState({ user: null });
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="main">
        <Home />
        <NavBar
          openLogin={this.openLogin}
          openSignup={this.openSignup} />
        <Signup
          showSignup={this.state.showSignup}
          openSignup={this.openSignup}
        />
        <Login
          showLogin={this.state.showLogin}
          openLogin={this.openLogin} />
        <Switch></Switch>
      </div>
    );
  }
}



export default App;