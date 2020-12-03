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
  width: 400px;
  height: 170px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #15202b;
  position: relative;
  z-index: 10;
  border-radius: 10px;

  h2 {
    text-align: center;
    padding-top: 15px;
    color: #fff;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
  color: rgb(29, 161, 242);
`;

const FormContainer = styled.form `
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  padding: 0px 15px;
  input {
    height: 1.2em;
  }
  button {
    color: #1da1f2;
    border: 1px solid #1da1f2;
    border-radius: 20px;
    background-color: #192734;
    justify-self: center;
    font-size: 1.1em;
    width: fit-content;
    height: fit-content; 
  }
  button:hover{
    background-color: rgba(29, 161, 242, 0.5);
  }
`


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
    props.toggleLogin()
    clearState()
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
      props.toggleLogin();
    }
  };

  return (
    <>
      {props.showLogin ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showLogin={props.showLogin}>
              <div>
                <h2>Login</h2>
                <FormContainer onSubmit={handleSubmit}>
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
                    Login
                  </button>
        
                </FormContainer>
                  </div>
              <CloseModalButton
                aria-label='Close modal'
                onClick={() => props.toggleLogin()}
              />
            </ModalWrapper>
          </animated.div>
        </Background>
      )  : null }
    </>
  );
}
