import React from 'react';
import { Link } from 'react-router-dom';
import HeaderAdm from '../../components/HeaderAdm';
import BackImg from '../../assets/images/Back/Back.png';
import LixeiraGrayImg from '../../assets/images/LixeiraGray/LixeiraGray.png';
import {
  Container,
  Content,
  SessionRegisterForm,
  InputGroupSession,
  ButtonForm,
  SessionsList,
} from './styles';

const SessionRegister: React.FC = () => {
  return (
    <Container>
      <HeaderAdm isAuthenticated={true} />
      <Content>
        <Link
          to="/evaluation"
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
            <u>Cadastro de Seção</u>
          </h1>

          <SessionsList>
            <InputGroupSession>
              <label htmlFor="1secao">1 ª Seção:</label>
              <input type="text" id="1secao" />
              <img src={LixeiraGrayImg} alt="Deletar" height={30} />
              <strong>+</strong>
            </InputGroupSession>
            <InputGroupSession>
              <label htmlFor="1secao">1 ª Seção:</label>
              <input type="text" id="1secao" />
              <img src={LixeiraGrayImg} alt="Deletar" height={30} />
              <strong>+</strong>
            </InputGroupSession>
            <InputGroupSession>
              <label htmlFor="1secao">1 ª Seção:</label>
              <input type="text" id="1secao" />
              <img src={LixeiraGrayImg} alt="Deletar" height={30} />
              <strong>+</strong>
            </InputGroupSession>
            <InputGroupSession>
              <label htmlFor="1secao">1 ª Seção:</label>
              <input type="text" id="1secao" />
              <img src={LixeiraGrayImg} alt="Deletar" height={30} />
              <strong>+</strong>
            </InputGroupSession>
            <InputGroupSession>
              <label htmlFor="1secao">1 ª Seção:</label>
              <input type="text" id="1secao" />
              <img src={LixeiraGrayImg} alt="Deletar" height={30} />
              <strong>+</strong>
            </InputGroupSession>
            <InputGroupSession>
              <label htmlFor="1secao">1 ª Seção:</label>
              <input type="text" id="1secao" />
              <img src={LixeiraGrayImg} alt="Deletar" height={30} />
              <strong>+</strong>
            </InputGroupSession>
            <InputGroupSession>
              <label htmlFor="1secao">1 ª Seção:</label>
              <input type="text" id="1secao" />
              <img src={LixeiraGrayImg} alt="Deletar" height={30} />
              <strong>+</strong>
            </InputGroupSession>
            <InputGroupSession>
              <label htmlFor="1secao">1 ª Seção:</label>
              <input type="text" id="1secao" />
              <img src={LixeiraGrayImg} alt="Deletar" height={30} />
              <strong>+</strong>
            </InputGroupSession>
            <InputGroupSession>
              <label htmlFor="1secao">1 ª Seção:</label>
              <input type="text" id="1secao" />
              <img src={LixeiraGrayImg} alt="Deletar" height={30} />
              <strong>+</strong>
            </InputGroupSession>
            <InputGroupSession>
              <label htmlFor="1secao">1 ª Seção:</label>
              <input type="text" id="1secao" />
              <img src={LixeiraGrayImg} alt="Deletar" height={30} />
              <strong>+</strong>
            </InputGroupSession>
            <InputGroupSession>
              <label htmlFor="1secao">1 ª Seção:</label>
              <input type="text" id="1secao" />
              <img src={LixeiraGrayImg} alt="Deletar" height={30} />
              <strong>+</strong>
            </InputGroupSession>
          </SessionsList>
          <footer style={{ width: '100%' }}>
            <ButtonForm type="submit">Salvar</ButtonForm>
          </footer>
        </SessionRegisterForm>
      </Content>
    </Container>
  );
};

export default SessionRegister;
