import React from 'react';

import HeaderAdm from '../../components/HeaderAdm';
import BackImg from '../../assets/images/Back/Back.png';
import LupaImg from '../../assets/images/Lupa/Lupa.png';
import { Link } from 'react-router-dom';
import { Container, Content, EvaluationContainer } from './styles';

const Evaluation: React.FC = () => {
  return (
    <Container>
      {' '}
      <HeaderAdm isAuthenticated={true} />
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
              <h2>Adicionar Seção</h2>
              <Link to="/session-register" style={{ textDecoration: 'none' }}>
                <div className="btn-add">+</div>
              </Link>
            </div>

            <div className="add-av" style={{ marginLeft: 20 }}>
              {' '}
              <h2>Adicionar Critério</h2>
              <Link to="/criterion-register" style={{ textDecoration: 'none' }}>
                <div className="btn-add">+</div>
              </Link>
            </div>
          </div>
        </EvaluationContainer>
      </Content>
    </Container>
  );
};

export default Evaluation;
