import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';

import getValidationErrors from '../../../utils/getValidationErrors';

import Modal from '..';
import Loading from '../../Loading';
import Button from '../../Button';

import { Container, CloseModal } from './styles';
import Input from '../../Input';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

interface AdminForgotPasswordFormData {
  email: string;
}

const ForgotPasswordModal: React.FC<IModalProps> = ({ isOpen, setIsOpen }) => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const [loading, setLoading] = useState(false);
  const [toSend, setToSend] = useState(true);

  const handleSubmit = useCallback(
    async (data: AdminForgotPasswordFormData) => {
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

        await api.post('admins/password/forgot', {
          email: data.email,
        });

        setToSend(false);
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
    [addToast],
  );

  return (
    <>
      {loading && <Loading zIndex={1} />}

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <CloseModal onClick={setIsOpen}>
          <strong>X</strong>
        </CloseModal>
        <Container>
          {toSend ? (
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input name="email" placeholder="Email" />

              <Button type="submit">Enviar</Button>
            </Form>
          ) : (
            <div>
              <strong>
                Uma requisição de senha foi enviada para o email informado
              </strong>

              <Button type="button" onClick={setIsOpen}>
                Ok
              </Button>
            </div>
          )}
        </Container>
      </Modal>
    </>
  );
};

export default ForgotPasswordModal;
