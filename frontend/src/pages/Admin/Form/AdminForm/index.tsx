import React, { useCallback, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import api from '../../../../services/api';

import getValidationErrors from '../../../../utils/getValidationErrors';

import { useToast } from '../../../../hooks/toast';

import {
  Background,
  Container,
  SecondaryHeader,
  InputsContainer,
} from './styles';

import Header from '../../../../components/Header';
import Loading from '../../../../components/Loading';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';

export interface IAdminOperationsData {
  name: string;
  ra: string;
  email: string;
  password: string;
}

const AdminForm: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: IAdminOperationsData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required(),
          email: Yup.string().email().required(),
          ra: Yup.string().required(),
          password: Yup.string().required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const adminData: IAdminOperationsData = {
          name: data.name,
          email: data.email,
          ra: data.ra,
          password: data.password,
        };

        setLoading(true);

        await api.post('admins', adminData);

        addToast({
          type: 'success',
          title: 'Administrador criado com sucesso',
        });

        history.push('/admins');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na criação de administrador',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, history],
  );

  return (
    <>
      {loading && <Loading zIndex={1} />}

      <Header />

      <Background>
        <SecondaryHeader>
          <Link to="admins">
            <FontAwesomeIcon size="3x" icon={faChevronLeft} />
          </Link>
          <strong>Cadastro de administrador</strong>
        </SecondaryHeader>

        <Container>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <InputsContainer>
              <strong>1. Nome do administrador</strong>
              <Input name="name" type="text" placeholder="Nome" />

              <strong>2. Email</strong>
              <Input name="email" type="text" placeholder="Email" />
            </InputsContainer>

            <InputsContainer>
              <strong>3. RA</strong>
              <Input name="ra" type="number" placeholder="RA" />

              <strong>4. Senha</strong>
              <Input name="password" type="password" placeholder="Senha" />

              <Button type="submit">Criar</Button>
            </InputsContainer>
          </Form>
        </Container>
      </Background>
    </>
  );
};

export default AdminForm;
