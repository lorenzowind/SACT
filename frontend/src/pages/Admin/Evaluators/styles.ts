import styled from 'styled-components';

import backgroundImg from '../../../assets/background.png';

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
  grid-template-columns: 20% 80%;
  grid-template-areas: 'back evaluator';
`;

export const EvaluatorContainer = styled.div`
  grid-area: evaluator;
  margin-top: 50px;
  h1 {
    text-align: left;
    font-size: 24pt;
    font-weight: bold;
    line-height: 20px;
    color: #0000fb;
    margin-bottom: 40px;
  }
  h2 {
    text-align: left;
    font-size: 18pt;
    font-weight: normal;
    line-height: 20px;
    color: #0000fb;
    margin-bottom: 10px;
    letter-spacing: normal;
  }
  div.input-text {
    width: 318px;
    height: 41px;
    display: flex;
    border-radius: 10px;
    border: solid 1px #707070;
    background-color: #f5f5f5;
    padding: 5px;
    justify-content: space-between;
    margin-bottom: 30px;
  }
  div.input-text input {
    width: 85%;
    height: 100%;
    background-color: #f5f5f5;
    border: 0;
  }
  div.add-eva {
    display: flex;
    align-items: center;
  }
  div.add-eva div.btn-add {
    margin-left: 10px;
    width: 40px;
    height: 40px;
    font-size: 24pt;
    font-weight: normal;
    text-align: center;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    background-color: #cdcdcd;
    color: #707070;
    border: solid 1px #707070;
    cursor: pointer;
  }
`;
