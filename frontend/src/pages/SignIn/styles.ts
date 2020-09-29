import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 695px;
`;

export const Content = styled.div`
  width: 500px;
  height: max-content;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

export const FormAuthentication = styled.form`
  width: 300px;
  padding: 10px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const InputFormAuth = styled.input`
  width: 245px;
  height: 32px;
  border-radius: 10px;
  border: solid 1px #707070;

  background-color: #fff;
  padding: 5px;
  margin: 10px;
`;

export const Button = styled.button`
  width: 120px;
  height: 50px;
  margin-top: 12px;
  border-radius: 10px;
  background-color: #0000fb;
  color: #f5f5f5;
  font-size: 14pt;
  border: 0;
  cursor: pointer;
`;

export const AlertPassword = styled.div`
  width: 330px;
  height: 215px;
  border: solid 1px #707070;
  background-color: #f9f8f8;
  position: absolute;
  top: 30%;
  left: 55%;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  padding: 10px;

  p {
    text-align: justify;
    margin-top: 5px;
    font-size: 14pt;
    color: #676060;
  }
`;

export const ButtonHidden = styled.a`
  width: 25px;
  height: 25px;
  margin: 0;
  font-size: 14pt;
  border: 0;
  cursor: pointer;
  font-size: 24pt;
  line-height: 30px;
  font-weight: 700;
  float: right;
`;

export const ButtonAlert = styled.button`
  width: 80px;
  height: 40px;
  font-size: 14pt;
  padding: 5px;
  color: #fff;
  background-color: #0000fb;
  border-radius: 10px;
  border: 0;
  cursor: pointer;
  margin: 30px auto;
`;
