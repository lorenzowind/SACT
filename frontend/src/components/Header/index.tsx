import React from 'react';
import { Link } from 'react-router-dom';

import adminImg from '../../assets/icon_admin.png';

import { Header } from './styles';

interface HeaderProps {
  isAuthenticated: boolean;
}

const HeaderAdm: React.FC<HeaderProps> = ({ isAuthenticated }) => {
  return (
    <Header>
      <div style={{ color: '#707070' }}>
        {isAuthenticated ? (
          <Link to="/admin" style={{ color: '#707070' }}>
            Logout
          </Link>
        ) : (
          ''
        )}
        <img src={adminImg} alt="ADM" height={64} />
        ADM
      </div>
    </Header>
  );
};

export default HeaderAdm;
