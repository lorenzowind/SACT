import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const Content = styled.main`
  width: 800px;
  height: 100%;
  margin: 0 20%;

  justify-content: center;
  align-items: center;

  display: grid;

  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 270px 168px;
  grid-gap: 50px;
  grid-template-areas: 'trofeu relatorio relatorio ' 'fichas avaliadores info';
`;

export const Ranking = styled.div`
  grid-area: trofeu;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 20px 20px 10px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px #707070;
  background-color: #f9f8f8;
  padding: 40px;
  margin-top: 150px;
  a {
    text-decoration: none;
  }

  img {
    margin-left: 10%;
  }
  footer {
    color: #0004ff;
    font-size: 24pt;
    font-weight: bold;
    text-align: center;
  }
`;

export const Relatorio = styled.div`
  width: 100%;
  height: 250px;
  grid-area: relatorio;
  grid-column: relatorio span relatorio;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 20px 20px 10px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px #707070;
  background-color: #f9f8f8;
  padding: 20px;
  margin-top: 180px;

  div#group-icon {
    display: flex;
    color: #0004ff;
    font-size: 20pt;
    font-weight: bold;
    text-align: left;
    align-items: center;
    justify-content: start;
  }

  ul {
    margin-left: 15%;
    list-style-type: none;
  }

  li {
    width: 100%;
    color: #707070;
    font-size: 14pt;
    font-weight: 400;
    text-align: left;
    margin-top: 20px;
  }
  li a {
    text-decoration: none;
    cursor: pointer;
  }
`;
export const DonwloadsDiv = styled.div`
  display: grid;
  grid-template-columns: 400px 45px;
  grid-template-areas: 'name icone';
  grid-column-gap: 10px;
  aling-items: center;
`;
export const ListNames = styled.ul`
  grid-area: name;
`;

export const ListIcones = styled.ul`
  grid-area: icone;
  margin-top: -12px;

  li + li {
    margin-top: 5px;
  }

  li {
    cursor: pointer;
  }
`;

export const Fichas = styled.div`
  grid-name: fichas;

  width: 115%;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 20px 20px 10px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px #707070;
  background-color: #f9f8f8;
  padding: 40px;
  margin-top: 150px;
  display: flex;
  flex-direction: column;
  div {
    display: flex;
    aling-items: center;
    justify-content: center;
  }
  div h1 {
    font-size: 75px;
    color: #0004ff;
    font-weight: bold;
    text-align: left;
  }
  div h2 {
    margin-top: 17%;
    margin-left: 2px;
    font-size: 45px;
    color: #707070;
    font-weight: bold;
    text-align: right;
  }
  footer {
    color: #0004ff;
    font-size: 15pt;
    font-weight: bold;
    text-align: justify;
  }
`;

export const Avaliadores = styled.div`
  grid-name: avaliadores;
  cursor: pointer;
  height: 195px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 20px 20px 10px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px #707070;
  background-color: #f9f8f8;
  padding: 20px;
  margin-top: 150px;
  display: flex;
  flex-direction: column;
  div {
    display: flex;
    aling-items: center;
    justify-content: center;
  }
  div h1 {
    font-size: 75px;
    color: #0004ff;
    font-weight: bold;
    text-align: left;
  }
  div h2 {
    margin-top: 17%;
    margin-left: 2px;
    font-size: 45px;
    color: #707070;
    font-weight: bold;
    text-align: right;
  }
  footer {
    color: #0004ff;
    font-size: 15pt;
    font-weight: bold;
    text-align: center;
  }
`;

export const Informacoes = styled.div`
  grid-area: info;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 20px 20px 10px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px #707070;
  background-color: #f9f8f8;
  padding: 20px;
  margin-top: 150px;
  display: flex;
  flex-direction: column;

  div#group-icon {
    display: flex;
    color: #0004ff;
    font-size: 20pt;
    font-weight: bold;
    text-align: left;
    align-items: center;
    justify-content: start;
  }

  ul {
    margin-top: 2px;
    list-style-type: none;
  }
  li {
    width: 100%;
    color: #707070;
    font-size: 14pt;
    font-weight: 400;
    text-align: left;
  }
  li + li {
    margin-top: 2px;
  }

  li a {
    text-decoration: none;
  }
  li a:visited {
    color: #0004ff;
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
export const Popup = styled.div`
  position: absolute;
  top: 12%;
  left: 30%;
  width: 450px;
  height: 350px;
  border-radius: 10px;
  box-shadow: 20px 20px 10px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px #707070;
  background-color: #f9f8f8;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  padding: 10px;
`;

export const ListAvaliadores = styled.ul`
  width: 80%;
  height: 90%;
  margin: 0 auto;
  padding: 10px;
  list-style-type: none;
`;

export const ItemAvaliador = styled.li`
  display: flex;
  flex-direction: row;

  align-items: center;
  h1 {
    font-size: 14pt;
    color: #707070;
  }
`;
