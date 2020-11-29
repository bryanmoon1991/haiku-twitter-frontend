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

export const EditProfile = (props) => {
  const initialState = {
    username: props.currentUser.username,
    bio: props.currentUser.bio,
    image: props.currentUser.image
  };

  let [{ username, bio, image }, setState] = useState(initialState);

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
                <h1>Edit Profile</h1>
                <form onSubmit={handleSubmit}>
                  <input
                    placeholder="username"
                    type="text"
                    name="username"
                    value={username}
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
                </form>
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
