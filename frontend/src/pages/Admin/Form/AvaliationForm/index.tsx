import React from 'react';
import { Link } from 'react-router-dom';

import HeaderAdm from '../../../../components/Header';

import BackImg from '../../../../assets/icon_back.png';

import {
  Background,
  Container,
  Content,
  SessionRegisterForm,
  InputGroup,
  ButtonForm,
  SessionsList,
} from './styles';

const AvaliationForm: React.FC = () => {
  return (
    <Background>
      <Container>
        <HeaderAdm />
        <Content>
          <Link
            to="/avaliations"
            style={{
              gridArea: 'back',
              height: 71,
              cursor: 'pointer',
              marginTop: 10,
            }}
          >
            <img src={BackImg} alt="Voltar" height={71} />
          </Link>

          <SessionRegisterForm>
            <h1
              style={{
                position: 'absolute',
                textAlign: 'center',
                left: '42%',
                top: 100,
                color: '#676060',
              }}
            >
              <u>Cadastro de Seção-critério</u>
            </h1>

            <SessionsList>
              <InputGroup>
                <label htmlFor="session">Seção:</label>
                <input type="text" id="session" placeholder="Seção" />
              </InputGroup>
              <InputGroup>
                <label htmlFor="criterion">Critério:</label>
                <input type="text" id="criterion" placeholder="Critério" />
              </InputGroup>

              <ButtonForm type="submit">Salvar</ButtonForm>
            </SessionsList>
          </SessionRegisterForm>
        </Content>
      </Container>
    </Background>
  );
};

export default AvaliationForm;
