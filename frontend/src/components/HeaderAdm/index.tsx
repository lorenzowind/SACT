import React from 'react';
import AdminImg from '../../assets/images/Admin/Admin.png';

import { Link } from 'react-router-dom';

import { Header } from './styles';

interface HeaderProps {
  isAuthenticated: boolean;
}

const HeaderAdm: React.FC<HeaderProps> = ({ isAuthenticated }) => {
  return (
    <Header>
      <div style={{ color: '#707070' }}>
        {isAuthenticated ? (
          <Link to="/" style={{ color: '#707070' }}>
            Logout
          </Link>
        ) : (
          ''
        )}
        <img src={AdminImg} alt="ADM" height={64} />
        ADM
      </div>
    </Header>
  );
};

export default HeaderAdm;
