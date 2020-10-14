import React from 'react';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAdminAuth } from '../../hooks/adminAuth';

import { Container } from './styles';

const HeaderAdm: React.FC = () => {
  const { admin, signOut } = useAdminAuth();

  return (
    <Container>
      {admin ? (
        <button type="button" onClick={signOut}>
          LOGOUT
        </button>
      ) : (
        ''
      )}
      <FontAwesomeIcon icon={faUserTie} size="2x" />
      <strong>ADM</strong>
    </Container>
  );
};

export default HeaderAdm;
