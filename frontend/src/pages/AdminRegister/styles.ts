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

export const AdmRegisterForm = styled.form`
  grid-area: regis;
  padding-top: 200px;
  margin-left: 10%;

  display: grid;

  grid-template-columns: 50% 50%;
  grid-template-rows: repeat(4, 1fr);
  grid-template-areas: 'name cpf' 'area ra' 'area  senha' 'btn button';
`;

export const InputGroupAdm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: max-content;
  justify-content: start;

  label {
    font-size: 20px;
    font-weight: normal;
    color: #676060;
    margin-bottom: 5px;
  }

  input {
    width: 245px;
    height: 32px;
    border-radius: 5px;
    padding: 10px;
    border: solid 1px #707070;
    background-color: #ffffff;
  }
  div.checkbox-input {
    margin-left: 10px;
  }
  div.checkbox-input input {
    cursor: pointer;
    width: 20px;
    height: 20px;
    border-radius: 5px;
    border: solid 1px #707070;
    background-color: #ffffff;
  }
  div.checkbox-input label {
    font-size: 18px;
    font-weight: normal;
    color: #676060;
    margin-left: 5px;
    margin-bottom: 5px;
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
