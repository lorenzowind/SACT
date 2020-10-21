import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useEvaluatorAuth } from '../../../hooks/evaluatorAuth';

import { Background, Main } from './styles';

import getValidationErrors from '../../../utils/getValidationErrors';

import logoImg from '../../../assets/logo.png';

import Input from '../../../components/Input';
import Loading from '../../../components/Loading';

interface EvaluatorSignInFormData {
  email: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { signIn } = useEvaluatorAuth();

  const handleSubmit = useCallback(
    async (data: EvaluatorSignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        setLoading(true);

        await signIn({
          email: data.email,
        });

        setError(false);

        history.push('projects-list');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        setError(true);
      } finally {
        setLoading(false);
      }
    },
    [history, signIn],
  );

  return (
    <>
      {loading && <Loading zIndex={1} />}

      <Background>
        <Main>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <img src={logoImg} alt="SACT Logo" />

            <section>
              {error && <strong>*Email inválido</strong>}
              <Input type="text" name="email" placeholder="Email" />
            </section>

            <button type="submit">Entrar</button>
          </Form>
        </Main>
      </Background>
    </>
  );
};

export default SignIn;
