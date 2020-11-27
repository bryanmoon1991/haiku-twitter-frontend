import React, { useRef, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';


const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;



export const Signup = (props) => {

    const initialState = {
        username: '',
        email: '',
        password: '',
    };

    let [{ username, email, password }, setState] = useState(initialState)
  
    const clearState = () => setState({ ...initialState });

    const handleChange = (event) => {
        const { name, value } = event.target
        setState((prevState => ({ ...prevState, [name]: value })));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let user = {
        username: username,
        email: email,
        password: password,
        bio: "",
        image: "",
        };
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
            props.handleSignup(data);
            redirect();
        });
    };

    const redirect = () => {
        props.history.push("/");
    };



    const modalRef = useRef();

    const animation = useSpring({
    config: {
        duration: 250,
    },
    opacity: props.showSignup ? 1 : 0,
    transform: props.showSignup ? `translateY(0%)` : `translateY(-100%)`,
    });

    const closeModal = (e) => {
    if (modalRef.current === e.target) {
        props.openSignup();
    }
    };

    // const handleErrors = () => {
    //   return (
    //     <div>
    //       <ul>
    //         {state.errors.map((error) => {
    //           return <li key={error}>{error}</li>;
    //         })}
    //       </ul>
    //     </div>
    //   );
    // };


    return (
      <>
        {props.showSignup ? (
          <Background onClick={closeModal} ref={modalRef}>
            <animated.div style={animation}>
              <ModalWrapper showSignup={props.showSignup}>
                <div>
                  <h1>Sign Up</h1>
                  <form onSubmit={handleSubmit}>
                    <input
                      placeholder="username"
                      type="text"
                      name="username"
                      value={username}
                      onChange={handleChange}
                    />
                    <input
                      placeholder="email"
                      type="text"
                      name="email"
                      value={email}
                      onChange={handleChange}
                    />
                    <input
                      placeholder="password"
                      type="password"
                      name="password"
                      value={password}
                      onChange={handleChange}
                    />
                    <button placeholder="submit" type="submit">
                      Sign Up
                    </button>
                  </form>
                  <div>
                    {
                      // state.errors ? handleErrors() : null
                    }
                  </div>
                </div>
                <CloseModalButton
                  aria-label="Close modal"
                  onClick={() => props.openSignup()}
                />
              </ModalWrapper>
            </animated.div>
          </Background>
        ) : null}
      </>
    );
}

