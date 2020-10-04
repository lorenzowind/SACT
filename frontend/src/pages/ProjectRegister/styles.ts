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

export const ProjectRegisterForm = styled.form`
  grid-area: regis;
  padding-top: 180px;
  margin-left: 10%;

  display: grid;

  grid-template-columns: 50% 50%;
  grid-template-rows: repeat(4, 75px);
  grid-template-areas: 'name integrantes' 'area integrantes' 'turma  integrantes' 'turma observacoes' 'turma  observacoes' 'turma button';
`;

export const InputGroupProject = styled.div`
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
  textarea {
    width: 245px;
    height: 117px;
    resize: none;
    border-radius: 5px;
    padding: 10px;
    border: solid 1px #707070;
    background-color: #ffffff;
  }
  select {
    width: 245px;
    height: 32px;

    border-radius: 5px;
    font-size: 12pt;
    font-weight: normal;
    color: #676060;
    border: solid 1px #707070;
    background-color: #ffffff;
  }
  option {
    font-size: 12pt;
    font-weight: normal;
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
`;
