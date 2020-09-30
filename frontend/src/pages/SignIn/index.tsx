import React from 'react';
import { Col, Container, Row } from 'react-grid-system';
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
      <Container>
        <Row align="center" style={{ height: '100vh' }}>
          <Col>
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
          </Col>
        </Row>
      </Container>
    </PaperBackground>
  );
};

export default SignIn;
