import React from 'react';
import { useHistory } from 'react-router-dom';

import { Background, Main } from './styles';

import logoImg from '../../../assets/logo.png';

const CPFInputHandleKeyPress = (
  event: React.KeyboardEvent<HTMLInputElement> & {
    target: any;
  },
) => {
  if (!/^\d$/.test(event.key) || event.target.value.length > 10) {
    event.preventDefault();
  }
};

const SignIn: React.FC = () => {
  const history = useHistory();

  return (
    <Background>
      <Main>
        <img
          src={logoImg}
          alt="SACT Logo"
          style={{ width: '100%', maxWidth: '400px' }}
        />
        <br />

        <input
          type="text"
          placeholder="CPF"
          onKeyPress={CPFInputHandleKeyPress}
        />

        <br />
        <input
          type="button"
          value="Entrar"
          onClick={() => {
            history.push('projects-list');
          }}
        />
      </Main>
    </Background>
  );
};

export default SignIn;
