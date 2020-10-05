import styled from 'styled-components';

import backgroundImg from '../../../../assets/background.png';

export const Background = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  background-image: url(${backgroundImg});
  background-repeat: no-repeat;
  background-size: cover;
`;

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 10% 90%;
  grid-template-areas: 'back regis';
`;
export const SessionRegisterForm = styled.form`
  grid-area: regis;
  padding-top: 180px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const SessionsList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const InputGroup = styled.li`
  display: flex;
  flex-direction: column;
  height: max-content;
  margin-bottom: 25px;

  label {
    width: 120px;
    font-size: 20pt;
    margin-bottom: 5px;
    font-weight: normal;
    color: #676060;
  }

  input {
    width: 400px;
    height: 32px;
    border-radius: 5px;
    padding: 10px;
    border: solid 1px #707070;
    background-color: #ffffff;
  }
  img,
  strong {
    cursor: pointer;
  }
  strong {
    font-size: 24pt;
    color: #676060;
  }
`;

export const ButtonForm = styled.button`
  width: 94px;
  height: 42px;
  color: #f5f5f5;
  font-size: 20pt;
  text-align: center;
  border-radius: 5px;
  border: 0;
  background-color: #0000fb;
  margin-top: 30px;
  margin-left: 75%;
`;
