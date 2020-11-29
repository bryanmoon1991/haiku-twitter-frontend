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

export const Compose = (props) => {

    const initialState = {
        first: "",
        second: "",
        third: ""
    }

    let [{ first, second, third }, setState] = useState(initialState);

    const clearState = () => setState({ ...initialState });

    const handleChange = (event) => {
      const { name, value } = event.target;
      setState((prevState) => ({ ...prevState, [name]: value }));
    };

   const handleSubmit = (event) => {
     event.preventDefault();
     let haiku = {
       first: first,
       second: second,
       third: third,
     };
     props.createHaiku(haiku);
     props.toggleCompose();
     clearState();
   };

   const modalRef = useRef();

   const animation = useSpring({
     config: {
       duration: 250,
     },
     opacity: props.showCompose ? 1 : 0,
     transform: props.showCompose ? `translateY(0%)` : `translateY(-100%)`,
   });

   const closeModal = (e) => {
     if (modalRef.current === e.target) {
       props.toggleCompose();
     }
   }; 

    return (
      <>
        {props.showCompose ? (
          <Background onClick={closeModal} ref={modalRef}>
            <animated.div style={animation}>
              <ModalWrapper showCompose={props.showCompose}>
                <div>
                  <h1>Your New Haiku</h1>
                  <form onSubmit={handleSubmit}>
                    <input
                      placeholder="Line 1 (5 syllables)"
                      type="text"
                      name="first"
                      value={first}
                      onChange={handleChange}
                    />
                    <input
                      placeholder="Line 2 (7 syllables)"
                      type="text"
                      name="second"
                      value={second}
                      onChange={handleChange}
                    />
                    <input
                      placeholder="Line 3 (5 syllables)"
                      type="text"
                      name="third"
                      value={third}
                      onChange={handleChange}
                    />
                    <button placeholder="submit" type="submit">
                      Compose New Haiku
                    </button>
                  </form>
                </div>
                <CloseModalButton
                  aria-label="Close modal"
                  onClick={() => props.toggleCompose()}
                />
              </ModalWrapper>
            </animated.div>
          </Background>
        ) : null}
      </>
    );
}
