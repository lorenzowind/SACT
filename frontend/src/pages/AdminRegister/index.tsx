import React from 'react';
import { Link } from 'react-router-dom';
import HeaderAdm from '../../components/HeaderAdm';
import BackImg from '../../assets/images/Back/Back.png';
import {
  Container,
  Content,
  AdmRegisterForm,
  InputGroupAdm,
  ButtonForm,
} from './styles';

const AdminRegister: React.FC = () => {
  return (
    <Container>
      <HeaderAdm isAuthenticated={true} />
      <Content>
        <Link
          to="/admin"
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
              left: '35%',
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
          <InputGroupAdm style={{ gridArea: 'area', marginTop: 15 }}>
            <label>2. Area de Atuação</label>

            <div
              style={{ display: 'flex', marginBottom: 10, marginTop: 10 }}
              className="checkbox-input"
            >
              <input type="checkbox" id="meca" value="Mecatrônica" />
              <label htmlFor="meca"> Mecatrônica</label>
            </div>

            <div
              style={{ display: 'flex', marginBottom: 10 }}
              className="checkbox-input"
            >
              <input type="checkbox" id="info" value="Informática" />
              <label htmlFor="info"> Informática</label>
            </div>

            <div
              style={{ display: 'flex', marginBottom: 10 }}
              className="checkbox-input"
            >
              <input type="checkbox" id="eletro" value="Eletrônica" />
              <label htmlFor="eletro"> Eletrônica</label>
            </div>
          </InputGroupAdm>
          <InputGroupAdm style={{ gridArea: 'cpf' }}>
            <label htmlFor="cpf">3. CPF</label>
            <input type="number" placeholder="CPF" id="cpf" />
          </InputGroupAdm>

          <InputGroupAdm style={{ gridArea: 'ra', marginTop: 15 }}>
            <label htmlFor="ra">4. RA</label>
            <input type="number" placeholder="1234" id="ra" />
          </InputGroupAdm>

          <InputGroupAdm style={{ gridArea: 'senha', marginTop: 15 }}>
            <label htmlFor="senha">5. Senha</label>
            <input type="password" placeholder="12345678" id="senha" />
          </InputGroupAdm>

          <footer
            style={{
              gridArea: 'button',
              marginTop: 60,
              marginLeft: '45%',
            }}
          >
            <ButtonForm type="submit">Salvar</ButtonForm>
          </footer>
        </AdmRegisterForm>
      </Content>
    </Container>
  );
};

export default AdminRegister;
