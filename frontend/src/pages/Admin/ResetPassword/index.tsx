import React, { useCallback, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';

import { Background, Container } from './styles';

import getValidationErrors from '../../../utils/getValidationErrors';

import logoImg from '../../../assets/logo.png';

import Input from '../../../components/Input';
import Loading from '../../../components/Loading';
import Button from '../../../components/Button';
import Header from '../../../components/Header';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();
  const location = useLocation();

  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().min(6, 'Senha obrigatória'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), undefined],
            'Confirmação incorreta',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { password, password_confirmation } = data;
        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        setLoading(true);

        await api.post('admins/password/reset', {
          password,
          password_confirmation,
          token,
        });

        addToast({
          type: 'success',
          title: 'Senha resetada com sucesso',
        });

        history.push('/admin');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao resetar senha',
          description: 'Ocorreu um erro ao resetar sua senha, tente novamente.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, history, location.search],
  );

  return (
    <>
      {loading && <Loading zIndex={1} />}

      <Header />

      <Background>
        <Container>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <img src={logoImg} alt="SACT Logo" />

            <section>
              <Input type="password" name="password" placeholder="Nova senha" />

              <Input
                name="password_confirmation"
                placeholder="Confirmação da senha"
                type="password"
              />
            </section>

            <Button type="submit">Alterar</Button>
          </Form>
        </Container>
      </Background>
    </>
  );
};

export default ResetPassword;
