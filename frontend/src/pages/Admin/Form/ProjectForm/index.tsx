import React from 'react';
import { Link } from 'react-router-dom';

import HeaderAdm from '../../../../components/Header';
import BackImg from '../../../../assets/icon_back.png';

import {
  Background,
  Container,
  Content,
  ProjectRegisterForm,
  InputGroupProject,
  ButtonForm,
} from './styles';

const ProjectForm: React.FC = () => {
  return (
    <Background>
      <Container>
        <HeaderAdm isAuthenticated />
        <Content>
          <Link
            to="/projects"
            style={{
              gridArea: 'back',
              height: 71,
              cursor: 'pointer',
              marginTop: 10,
            }}
          >
            <img src={BackImg} alt="Voltar" height={71} />
          </Link>
          <ProjectRegisterForm>
            <h1
              style={{
                position: 'absolute',
                textAlign: 'center',
                left: '35%',
                top: 100,
                color: '#676060',
              }}
            >
              <u>Cadastro de Projeto</u>
            </h1>
            <InputGroupProject style={{ gridArea: 'name' }}>
              <label htmlFor="name">1. Nome do Projeto</label>
              <input type="text" placeholder="Nome" id="name" />
            </InputGroupProject>
            <InputGroupProject style={{ gridArea: 'area', marginTop: 15 }}>
              <label htmlFor="area">2. Área de atuação</label>
              <select id="area">
                <option value="curso" selected>
                  Curso
                </option>
              </select>
            </InputGroupProject>

            <InputGroupProject style={{ gridArea: 'turma', marginTop: 15 }}>
              <label htmlFor="turma">3. Turma</label>
              <select id="turma">
                <option value="Turma" selected>
                  Turma
                </option>
              </select>
            </InputGroupProject>

            <InputGroupProject style={{ gridArea: 'integrantes' }}>
              <label htmlFor="integrantes">4. Integrantes</label>
              <input
                type="text"
                placeholder="Integrante 1"
                id="integrantes"
                style={{ marginTop: 15 }}
              />
              <input
                type="text"
                placeholder="Integrante 2"
                style={{ marginTop: 15 }}
              />
              <input
                type="text"
                placeholder="Integrante 3"
                style={{ marginTop: 15 }}
              />
            </InputGroupProject>
            <InputGroupProject style={{ gridArea: 'observacoes' }}>
              <label htmlFor="observacoes">5. Observações</label>
              <textarea id="observacoes" />
            </InputGroupProject>

            <footer
              style={{
                gridArea: 'button',
                marginTop: 60,
                marginLeft: '45%',
              }}
            >
              <ButtonForm type="submit">Salvar</ButtonForm>
            </footer>
          </ProjectRegisterForm>
        </Content>
      </Container>
    </Background>
  );
};

export default ProjectForm;
