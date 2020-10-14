import React from 'react';
import { Link } from 'react-router-dom';

import HeaderAdm from '../../../../components/Header';
import BackImg from '../../../../assets/icon_back.png';

import {
  Background,
  Container,
  Content,
  AdmRegisterForm,
  InputGroupAdm,
  ButtonForm,
} from './styles';

const AdminForm: React.FC = () => {
  return (
    <Background>
      <Container>
        <HeaderAdm />
        <Content>
          <Link
            to="/admins"
            style={{
              gridArea: 'back',
              height: 71,
              cursor: 'pointer',
              marginTop: 10,
            }}
          >
            <img src={BackImg} alt="Voltar" height={71} />
          </Link>
          <AdmRegisterForm>
            <h1
              style={{
                position: 'absolute',
                textAlign: 'center',
                left: '40%',
                top: 100,
                color: '#676060',
              }}
            >
              <u>Cadastro de Administrador</u>
            </h1>
            <InputGroupAdm style={{ gridArea: 'name' }}>
              <label htmlFor="name">1. Nome do Avaliador</label>
              <input type="text" placeholder="Nome" id="name" />
            </InputGroupAdm>

            <InputGroupAdm style={{ gridArea: 'email', marginTop: 15 }}>
              <label htmlFor="email">2. Email</label>
              <input type="text" placeholder="Email" id="email" />
            </InputGroupAdm>

            <InputGroupAdm style={{ gridArea: 'password', marginTop: 15 }}>
              <label htmlFor="password">3. Senha</label>
              <input type="password" placeholder="Senha" id="password" />
            </InputGroupAdm>

            <footer
              style={{
                gridArea: 'button',
                marginTop: 60,
                marginLeft: '25%',
              }}
            >
              <ButtonForm type="submit">Salvar</ButtonForm>
            </footer>
          </AdmRegisterForm>
        </Content>
      </Container>
    </Background>
  );
};

export default AdminForm;
