import React, { useState } from 'react';

import AdminImg from '../../assets/images/Admin/Admin.png';
import LogoImg from '../../assets/images/Logo/Logo.png';

import {
  Container,
  Content,
  FormAuthentication,
  Header,
  InputFormAuth,
  Button,
  AlertPassword,
  ButtonHidden,
  ButtonAlert,
} from './styles';

const SignIn: React.FC = () => {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);

  function handleSendNewPassword() {
    hiddenAlert();
  }
  function hiddenAlert() {
    setForgotPassword(!forgotPassword);
  }

  return (
    <Container>
      <Header>
        <div>
          <img src={AdminImg} alt="ADM" height={64} />
          ADM
        </div>
      </Header>
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
            type="number"
            placeholder="CPF"
            value={cpf}
            onChange={ev => setCpf(ev.target.value)}
          />
          <InputFormAuth
            type="password"
            placeholder="Senha"
            value={password}
            onChange={ev => setPassword(ev.target.value)}
          />
          <a
            style={{
              width: '100%',
              textAlign: 'right',
              color: '#707070',
              fontSize: '12pt',
              cursor: 'pointer',
            }}
            onClick={handleSendNewPassword}
          >
            Esqueceu a senha?
          </a>
          {forgotPassword ? (
            <AlertPassword>
              <div style={{ width: '100%', color: '#0004ff' }}>
                <ButtonHidden onClick={hiddenAlert}>X</ButtonHidden>
              </div>
              <p>
                A sua nova senha foi enviada para o e-mail cadastrado de acordo
                com o CPF informado!{' '}
              </p>

              <ButtonAlert type="button" id="buttonAlert" onClick={hiddenAlert}>
                OK
              </ButtonAlert>
            </AlertPassword>
          ) : (
            ''
          )}
          <Button type="submit">Entrar</Button>
        </FormAuthentication>
      </Content>
    </Container>
  );
};

export default SignIn;
