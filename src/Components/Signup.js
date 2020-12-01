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
  height: 300px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
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

const FormContainer = styled.form `
  display: grid;
  grid-template-columns: 1fr;
`

export const Signup = (props) => {

    const initialState = {
        name: '',
        username: '',
        email: '',
        password: '',
    };

    let [{ name, username, email, password }, setState] = useState(initialState)
  
    const clearState = () => setState({ ...initialState });

    const handleChange = (event) => {
        const { name, value } = event.target
        setState(prevState => ({ ...prevState, [name]: value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let user = {
          name: name,
          username: username,
          email: email,
          password: password,
          bio: '',
          image: 'https://aem.dropbox.com/cms/content/dam/dropbox/blog/authors/avatars/defaultAvatar.png',
        };
        
        props.handleSignup(user);
        // this will close the modal but we should figure out how to handle errors
        props.toggleSignup();
        clearState()
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
        props.toggleSignup();
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
                <h1>Sign Up</h1>
                <FormContainer onSubmit={handleSubmit}>
                  <input
                    placeholder="full name"
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                  />
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
                </FormContainer>
                <div>
                  {
                    // state.errors ? handleErrors() : null
                  }
                </div>
                <CloseModalButton
                  aria-label="Close modal"
                  onClick={() => props.toggleSignup()}
                />
              </ModalWrapper>
            </animated.div>
          </Background>
        ) : null}
      </>
    );
}

