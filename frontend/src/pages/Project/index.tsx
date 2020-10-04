import React from 'react';
import HeaderAdm from '../../components/HeaderAdm';
import BackImg from '../../assets/images/Back/Back.png';
import LupaImg from '../../assets/images/Lupa/Lupa.png';
import { Link } from 'react-router-dom';
import { Container, Content, ProjectContainer } from './styles';

const Project: React.FC = () => {
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

        <ProjectContainer>
          <h1>Projetos</h1>
          <h2>Pesquisar Projetos</h2>
          <div className="input-text">
            <input type="text" />
            <img
              src={LupaImg}
              alt="Pesquisar"
              height={25}
              style={{ justifySelf: 'end', paddingRight: '5px' }}
            />
          </div>
          <div className="add-proj">
            {' '}
            <h2>Adicionar Projetos</h2>
            <Link to="/project-register" style={{ textDecoration: 'none' }}>
              <div className="btn-add">+</div>
            </Link>
          </div>
        </ProjectContainer>
      </Content>
    </Container>
  );
};

export default Project;
