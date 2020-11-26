import React, { Component } from 'react';

class Signup extends Component {
    state = { 
      username: '',
      email: '',
      password: '',
    };
  
    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
        [name]: value
        })
    };

    handleSubmit = (event) => {
        event.preventDefault()
        const { username, email, password } = this.state
        let user = {
            username: username,
            email: email,
            password: password,
            bio: "",
            image: ""
        }
        fetch("http://localhost:4000/api/v1/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({ user: user }),
        })
            .then((r) => r.json())
            .then((data) => {
                this.props.handleSignup(data)
                this.redirect()
        })
    }
   
    redirect = () => {
        this.props.history.push('/')
    }

    handleErrors = () => {
        return (
        <div>
            <ul>{this.state.errors.map((error) => {
            return <li key={error}>{error}</li>
            })}
            </ul> 
        </div>
        )
    }



    render() {
        const {username, email, password} = this.state
    return (
        <div>
            <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit}>
            <input
                placeholder="username"
                type="text"
                name="username"
                value={username}
                onChange={this.handleChange}
            />
            <input
                placeholder="email"
                type="text"
                name="email"
                value={email}
                onChange={this.handleChange}
            />
            <input 
                placeholder="password"
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
            />
            
            <button placeholder="submit" type="submit">
                Sign Up
            </button>
        
            </form>
            <div>
            {
                this.state.errors ? this.handleErrors() : null
            }
            </div>
        </div>
        );
    }
}
export default Signup;