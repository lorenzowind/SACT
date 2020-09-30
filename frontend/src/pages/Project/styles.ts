import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  grid-template-areas: 'back proj';
`;

export const ProjectContainer = styled.div`
  grid-area: proj;

  margin-top: 50px;

  h1 {
    tex-align: left;
    font-size: 24pt;
    font-wieght: bold;
    line-height: 20px;
    color: #0000fb;
    margin-bottom: 40px;
  }
  h2 {
    tex-align: left;
    font-size: 18pt;
    font-wieght: normal;
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

  div.add-proj {
    display: flex;
    align-items: center;
  }

  div.add-proj div.btn-add {
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
