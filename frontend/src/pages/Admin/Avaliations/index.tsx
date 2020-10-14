import React from 'react';
import { Link } from 'react-router-dom';

import HeaderAdm from '../../../components/Header';

import BackImg from '../../../assets/icon_back.png';
import LupaImg from '../../../assets/icon_search.png';

import { Background, Container, Content, EvaluationContainer } from './styles';

const Avaliations: React.FC = () => {
  return (
    <Background>
      <Container>
        {' '}
        <HeaderAdm />
        <Content>
          <Link
            to="/dashboard"
            style={{
              gridArea: 'back',
              height: 71,

              cursor: 'pointer',
              marginTop: 10,
            }}
          >
            <img src={BackImg} alt="Voltar" height={71} />
          </Link>

          <EvaluationContainer>
            <h1>Ficha de Avaliação</h1>
            <h2>Pesquisar Critérios</h2>
            <div className="input-text">
              <input type="text" />
              <img
                src={LupaImg}
                alt="Pesquisar"
                height={25}
                style={{ justifySelf: 'end', paddingRight: '5px' }}
              />
            </div>
            <div style={{ display: 'flex' }}>
              <div className="add-av">
                {' '}
                <h2>Adicionar Seção-critério</h2>
                <Link to="/avaliation-form" style={{ textDecoration: 'none' }}>
                  <div className="btn-add">+</div>
                </Link>
              </div>
            </div>
          </EvaluationContainer>
        </Content>
      </Container>
    </Background>
  );
};

export default Avaliations;
