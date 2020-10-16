import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useAdminAuth } from '../../../hooks/adminAuth';
import { useToast } from '../../../hooks/toast';

import { Background, Container } from './styles';

import getValidationErrors from '../../../utils/getValidationErrors';

import logoImg from '../../../assets/logo.png';

import Input from '../../../components/Input';
import Loading from '../../../components/Loading';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import ForgotPasswordModal from '../../../components/Modal/ForgotPasswordModal';

interface AdminSignInFormData {
  ra: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  const { signIn } = useAdminAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: AdminSignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          ra: Yup.string().required('RA obrigatório'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        setLoading(true);

        await signIn({
          ra: data.ra,
          password: data.password,
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, history, signIn],
  );

  const toggleModalForgotPassword = useCallback(() => {
    setForgotPasswordOpen(!forgotPasswordOpen);
  }, [forgotPasswordOpen]);

  return (
    <>
      {loading && <Loading zIndex={1} />}

      <ForgotPasswordModal
        isOpen={forgotPasswordOpen}
        setIsOpen={toggleModalForgotPassword}
      />

      <Header />

      <Background>
        <Container>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <img src={logoImg} alt="SACT Logo" />

            <section>
              <Input type="number" name="ra" placeholder="RA" />

              <Input name="password" placeholder="Senha" type="password" />

              <button type="button" onClick={() => setForgotPasswordOpen(true)}>
                Esqueceu a senha?
              </button>
            </section>

            <Button type="submit">Entrar</Button>
          </Form>
        </Container>
      </Background>
    </>
  );
};

export default SignIn;
