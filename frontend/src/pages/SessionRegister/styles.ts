import styled from 'styled-components';
export const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  grid-template-areas: 'back regis';
`;
export const SessionRegisterForm = styled.form`
  grid-area: regis;
  padding-top: 180px;
  margin: 0 auto;

  width: 70%;
  height: 300px;

  display: flex;
  flex-direction: column;
`;

export const SessionsList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 300px;
`;

export const InputGroupSession = styled.li`
  display: flex;
  width: 100%;
  height: max-content;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;

  label {
    font-size: 20pt;
    font-weight: normal;
    color: #676060;
  }

  input {
    width: 423px;
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
  margin-left: 90%;
`;
