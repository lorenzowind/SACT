import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import LogoImg from '../../../assets/logo.png';

import HeaderAdm from '../../../components/Header';

import {
  Background,
  Container,
  Content,
  FormAuthentication,
  ForgotPassword,
  InputFormAuth,
  Button,
  AlertPassword,
  ButtonHidden,
  ButtonAlert,
} from './styles';

const SignIn: React.FC = () => {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);

  function hiddenAlert() {
    setForgotPassword(!forgotPassword);
  }

  function handleSendNewPassword() {
    hiddenAlert();
  }

  return (
    <Background>
      <Container>
        <HeaderAdm isAuthenticated={false} />
        <Content>
          <img
            style={{
              marginTop: '15%',
            }}
            src={LogoImg}
            alt="SACT"
            height={255}
          />
          <FormAuthentication>
            <InputFormAuth
              type="text"
              placeholder="Email"
              value={email}
              onChange={ev => setEmail(ev.target.value)}
            />
            <InputFormAuth
              type="password"
              placeholder="Senha"
              value={password}
              onChange={ev => setPassword(ev.target.value)}
            />

            <ForgotPassword type="button" onClick={handleSendNewPassword}>
              <strong
                style={{
                  width: '100%',
                  color: '#707070',
                  fontSize: '12pt',
                  cursor: 'pointer',
                }}
              >
                Esqueceu a senha?
              </strong>
            </ForgotPassword>

            {forgotPassword ? (
              <AlertPassword>
                <div style={{ width: '100%', color: '#0004ff' }}>
                  <ButtonHidden onClick={hiddenAlert}>X</ButtonHidden>
                </div>
                <p>
                  A sua nova senha foi enviada para o e-mail cadastrado de
                  acordo com o CPF informado!{' '}
                </p>

                <ButtonAlert
                  type="button"
                  id="buttonAlert"
                  onClick={hiddenAlert}
                >
                  OK
                </ButtonAlert>
              </AlertPassword>
            ) : (
              ''
            )}
            <Button
              type="button"
              onClick={() => {
                history.push('dashboard');
              }}
            >
              Entrar
            </Button>
          </FormAuthentication>
        </Content>
      </Container>
    </Background>
  );
};

export default SignIn;
