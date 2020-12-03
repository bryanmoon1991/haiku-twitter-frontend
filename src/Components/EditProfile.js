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
  height: 220px;
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


export const EditProfile = (props) => {
  const initialState = {
    username: props.currentUser.username,
    bio: props.currentUser.bio,
    image: props.currentUser.image,
    name: props.currentUser.name
  };

  let [{ username, bio, image, name }, setState] = useState(initialState);

//   const clearState = () => setState({ ...initialState });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let user = {
      username: username,
      bio: bio,
      image: image,
      name: name
    };
    props.editProfile(user);
    props.toggleEditProfile();
    // clearState();
  };

  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: props.showEditProfile ? 1 : 0,
    transform: props.showEditProfile ? `translateY(0%)` : `translateY(-100%)`,
  });

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      props.toggleEditProfile();
    }
  };

  return (
    <>
      {props.showEditProfile ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showEditProfile={props.showEditProfile}>
              <div>
                <h2>Edit Profile</h2>
                <FormContainer onSubmit={handleSubmit}>
                  <input
                    placeholder="username"
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleChange}
                  />
                  <input
                    placeholder="full name"
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                  />
                  <input
                    placeholder="bio"
                    type="text"
                    name="bio"
                    value={bio}
                    onChange={handleChange}
                  />
                  <input
                    placeholder="image url"
                    type="text"
                    name="image"
                    value={image}
                    onChange={handleChange}
                  />
                  <button placeholder="submit" type="submit">
                    Submit Changes
                  </button>
                </FormContainer>
              </div>
              <CloseModalButton
                aria-label="Close modal"
                onClick={() => props.toggleEditProfile()}
              />
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};
