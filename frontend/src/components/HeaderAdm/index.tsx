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
      <div>
        {isAuthenticated ? <Link to="/">Logout</Link> : ''}
        <img src={AdminImg} alt="ADM" height={64} />
        ADM
      </div>
    </Header>
  );
};

export default HeaderAdm;
