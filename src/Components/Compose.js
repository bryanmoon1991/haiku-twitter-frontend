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
  height: 210px;
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

const FormContainer = styled.form`
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
  button:hover {
    background-color: rgba(29, 161, 242, 0.5);
  }
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
     const syllable = require('syllable')

     let errors = []
     if (syllable(first) !== 5){
       errors.push('First line must contain 5 syllables')
     }else if (syllable(second) !== 7){
      errors.push('Second line must contain 7 syllables')
     }else if (syllable(third) !== 5){
      errors.push('Third line must contain 5 syllables')
     }
     if (errors.length > 0){
       alert(errors)
     }else{
       props.createHaiku(haiku);
       props.toggleCompose();
       clearState();
     }
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
                  <h2>Your New Haiku</h2>
                  <FormContainer onSubmit={handleSubmit}>
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
                  </FormContainer>
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
