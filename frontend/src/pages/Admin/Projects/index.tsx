import React from 'react';
import { Link } from 'react-router-dom';

import HeaderAdm from '../../../components/Header';

import BackImg from '../../../assets/icon_back.png';
import LupaImg from '../../../assets/icon_search.png';

import { Background, Container, Content, ProjectContainer } from './styles';

const Projects: React.FC = () => {
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
              <Link to="/project-form" style={{ textDecoration: 'none' }}>
                <div className="btn-add">+</div>
              </Link>
            </div>
          </ProjectContainer>
        </Content>
      </Container>
    </Background>
  );
};

export default Projects;
