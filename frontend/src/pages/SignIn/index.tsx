import React from 'react';
import { Input } from '../../components/Input';

import { PaperBackground } from '../../components/PaperBackground';
import { SactLogo } from '../../components/SactLogo';
import { Main } from './styles';

const CPFInputHandleKeyPress = (
  event: React.KeyboardEvent<HTMLInputElement> & {
    target: any;
  },
) => {
  if (!/^\d$/.test(event.key) || event.target.value.length > 10)
    event.preventDefault();
};

const SignIn: React.FC = () => {
  return (
    <PaperBackground>
      <Main>
        <SactLogo style={{ width: '100%', maxWidth: '400px' }} />
        <br />
        <Input
          type="text"
          placeholder="CPF"
          onKeyPress={CPFInputHandleKeyPress}
        />
        <br />
        <Input type="button" value="Entrar" />
      </Main>
    </PaperBackground>
  );
};

export default SignIn;
