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

export const AdmRegisterForm = styled.form`
  grid-area: regis;
  padding-top: 200px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const InputGroupAdm = styled.div`
  display: flex;
  flex-direction: column;
  height: max-content;
  label {
    font-size: 20px;
    font-weight: normal;
    color: #676060;
    margin-bottom: 5px;
  }
  input {
    width: 400px;
    height: 32px;
    border-radius: 5px;
    padding: 10px;
    border: solid 1px #707070;
    background-color: #ffffff;
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
`;
