import styled from 'styled-components';

export const Header = styled.header`
  width: 100%;
  height: max-content;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    float: right;
    margin-right: 20px;
    text-align: right;
    color: '#707070';
    line-height: 20px;
    font-size: 14pt;
  }

  div a {
    align-items: center;
    float: right;
    text-decoration: none;
    cursor: pointer;
    color: '#707070';
    line-height: 20px;
    font-size: 14pt;
  }

  div a:visited {
    color: '#707070';
  }
`;
