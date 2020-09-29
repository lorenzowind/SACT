import React from 'react';
import { Link } from 'react-router-dom';
import HeaderAdm from '../../components/HeaderAdm';
import BackImg from '../../assets/images/Back/Back.png';
import { Container, Content } from './styles';

const EvaluatorRegister: React.FC = () => {
  return (
    <Container>
      <HeaderAdm isAuthenticated={true} />
      <Content>
        <Link
          to="/evaluator"
          style={{
            gridArea: 'back',
            height: 71,
            cursor: 'pointer',
            marginTop: 10,
          }}
        >
          <img src={BackImg} alt="Voltar" height={71} />
        </Link>
      </Content>
    </Container>
  );
};

export default EvaluatorRegister;
