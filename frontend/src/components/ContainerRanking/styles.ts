import styled from 'styled-components';

export const Container = styled.div`
  grid-area: geral;
  width: 330px;
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  background-color: #f9f8f8;
  border-radius: 10px;
  box-shadow: 20px 20px 10px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px #707070;

  h1 {
    color: #0004ff;
    line-height: 35px;
    font-size: 20pt;
    font-weight: bold;
    text-align: center;
    margin-bottom: 10px;
  }

  ul {
    list-style-type: none;
    justify-content: space-between;
    margin-left: 10px;
  }

  ul li {
    color: #676060;
    margin-bottom: 10px;
    font-weight: normal;
    font-size: 18pt;
  }
`;
