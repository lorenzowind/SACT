import React from 'react';
import { Link } from 'react-router-dom';
import HeaderAdm from '../../components/HeaderAdm';
import BackImg from '../../assets/images/Back/Back.png';
import LupaImg from '../../assets/images/Lupa/Lupa.png';
import { Container, Content, AdminContainer } from './styles';

const Admin: React.FC = () => {
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
            <Link to="/admin/register" style={{ textDecoration: 'none' }}>
              <div className="btn-add">+</div>
            </Link>
          </div>
        </AdminContainer>
      </Content>
    </Container>
  );
};

export default Admin;
