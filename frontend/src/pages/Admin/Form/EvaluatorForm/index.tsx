import React from 'react';
import { Link } from 'react-router-dom';

import HeaderAdm from '../../../../components/Header';
import BackImg from '../../../../assets/icon_back.png';

import {
  Background,
  Container,
  Content,
  EvaluatorRegisterForm,
  InputGroupEvaluator,
  ButtonForm,
} from './styles';

const EvaluatorForm: React.FC = () => {
  return (
    <Background>
      <Container>
        <HeaderAdm isAuthenticated />
        <Content>
          <Link
            to="/evaluators"
            style={{
              gridArea: 'back',
              height: 71,
              cursor: 'pointer',
              marginTop: 10,
            }}
          >
            <img src={BackImg} alt="Voltar" height={71} />
          </Link>
          <EvaluatorRegisterForm>
            <h1
              style={{
                position: 'absolute',
                textAlign: 'center',
                left: '35%',
                top: 100,
                color: '#676060',
              }}
            >
              <u>Cadastro de Avaliador</u>
            </h1>
            <InputGroupEvaluator style={{ gridArea: 'name' }}>
              <label htmlFor="name">1. Nome</label>
              <input type="text" id="name" />
            </InputGroupEvaluator>
            <InputGroupEvaluator style={{ gridArea: 'area' }}>
              <label htmlFor="area">2. Área de atuação</label>
              <input type="text" id="area" />
            </InputGroupEvaluator>
            <InputGroupEvaluator style={{ gridArea: 'instituicao' }}>
              <label htmlFor="instituicao">3. Instituição que representa</label>
              <input type="text" id="instituicao" />
            </InputGroupEvaluator>
            <InputGroupEvaluator style={{ gridArea: 'telefone' }}>
              <label htmlFor="telefone">4. Telefone</label>
              <input type="tel" id="telefone" />
            </InputGroupEvaluator>
            <InputGroupEvaluator style={{ gridArea: 'email' }}>
              <label htmlFor="email">5. E-mail</label>
              <input type="email" id="email" />
            </InputGroupEvaluator>
            <InputGroupEvaluator style={{ gridArea: 'cpf' }}>
              <label htmlFor="cpf">6. CPF</label>
              <input type="number" id="cpf" />
            </InputGroupEvaluator>
            <InputGroupEvaluator style={{ gridArea: 'projetos' }}>
              <label htmlFor="projetos">7. Projetos que irá avaliar</label>
              <select id="projetos" style={{ marginTop: 15 }}>
                <option value="proj1">Projeto 1</option>
              </select>
              <select id="projetos" style={{ marginTop: 15 }}>
                <option value="proj1">Projeto 1</option>
              </select>
              <select id="projetos" style={{ marginTop: 15 }}>
                <option value="proj1">Projeto 1</option>
              </select>
              <select id="projetos" style={{ marginTop: 15 }}>
                <option value="proj1">Projeto 1</option>
              </select>
              <select id="projetos" style={{ marginTop: 15 }}>
                <option value="proj1">Projeto 1</option>
              </select>
            </InputGroupEvaluator>

            <InputGroupEvaluator style={{ gridArea: 'status' }}>
              <label htmlFor="status">6. Status de Avaliador</label>
              <select id="status">
                <option value="status1">Status 1</option>
              </select>
            </InputGroupEvaluator>

            <footer
              style={{
                gridArea: 'button',
                marginTop: 60,
                marginLeft: '45%',
              }}
            >
              <ButtonForm type="submit">Salvar</ButtonForm>
            </footer>
          </EvaluatorRegisterForm>
        </Content>
      </Container>
    </Background>
  );
};

export default EvaluatorForm;
