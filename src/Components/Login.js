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


export const Login = (props) => {
  const initialState = {
    username: "",
    password: "",
  };

  let [{ username, password }, setState] = useState(initialState)
  
  const clearState = () => setState({ ...initialState })

  const handleChange = (event) => {
        const { name, value } = event.target
        setState((prevState => ({ ...prevState, [name]: value })));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let user = {
      username: username,
      password: password,
    };
    props.handleLogin(user)
    redirect()
  };

  const redirect = () => {
    props.history.push("/");
  };


  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: props.showLogin ? 1 : 0,
    transform: props.showLogin ? `translateY(0%)` : `translateY(-100%)`,
  });

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      props.openLogin();
    }
  };

  return (
    <>
      {props.showLogin ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showLogin={props.showLogin}>
              <div>
                <h1>Log In</h1>
                <form onSubmit={handleSubmit}>
                  <input
                    placeholder="username"
                    type="text"
                    name="username"
                    value={username}
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
                    Log In
                  </button>
        
                </form>
                  </div>
              <CloseModalButton
                aria-label='Close modal'
                onClick={() => props.openLogin()}
              />
            </ModalWrapper>
          </animated.div>
        </Background>
      )  : null }
    </>
  );
}
