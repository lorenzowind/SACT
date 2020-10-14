import React from 'react';
import { Link } from 'react-router-dom';

import HeaderAdm from '../../../components/Header';

import BackImg from '../../../assets/icon_back.png';
import LupaImg from '../../../assets/icon_search.png';

import { Background, Container, Content, AdminContainer } from './styles';

const Admins: React.FC = () => {
  return (
    <Background>
      <Container>
        {' '}
        <HeaderAdm />
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

          <AdminContainer>
            <h1>Administradores</h1>
            <h2>Pesquisar Administradores</h2>
            <div className="input-text">
              <input type="text" />
              <img
                src={LupaImg}
                alt="Pesquisar"
                height={25}
                style={{ justifySelf: 'end', paddingRight: '5px' }}
              />
            </div>
            <div className="add-adm">
              {' '}
              <h2>Adicionar Administradores</h2>
              <Link to="/admin-form" style={{ textDecoration: 'none' }}>
                <div className="btn-add">+</div>
              </Link>
            </div>
          </AdminContainer>
        </Content>
      </Container>
    </Background>
  );
};

export default Admins;
