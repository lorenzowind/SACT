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
  grid-template-areas: 'back ranking';
`;

export const RankingGrid = styled.div`
  grid-area: ranking;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 259px 259px;
  grid-template-areas: 'geral info' 'meca eletro';
  padding: 10px;
  margin-top: 100px;
`;

export const RankingGeral = styled.div`
  grid-area: geral;
  width: 330px;
  height: 259px;
  display: flex;
  flex-direction: column;
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
  div ul {
    list-style-type: none;
    justify-content: space-between;
    margin-left: 10px;
  }
  div ul li {
    color: #676060;
    margin-bottom: 10px;
    font-weight: normal;
    font-size: 18pt;
  }
`;
