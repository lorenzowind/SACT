import React from 'react';
import { Link } from 'react-router-dom';

import HeaderAdm from '../../../components/Header';

import BackImg from '../../../assets/icon_back.png';
import LupaImg from '../../../assets/icon_search.png';

import { Background, Container, Content, EvaluatorContainer } from './styles';

const Evaluators: React.FC = () => {
  return (
    <Background>
      <Container>
        {' '}
        <HeaderAdm isAuthenticated />
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

          <EvaluatorContainer>
            <h1>Avaliadores</h1>
            <h2>Pesquisar Avaliadores</h2>
            <div className="input-text">
              <input type="text" />
              <img
                src={LupaImg}
                alt="Pesquisar"
                height={25}
                style={{ justifySelf: 'end', paddingRight: '5px' }}
              />
            </div>
            <div className="add-eva">
              {' '}
              <h2>Adicionar Avaliadores</h2>
              <Link to="/evaluator-form" style={{ textDecoration: 'none' }}>
                <div className="btn-add">+</div>
              </Link>
            </div>
          </EvaluatorContainer>
        </Content>
      </Container>
    </Background>
  );
};

export default Evaluators;
