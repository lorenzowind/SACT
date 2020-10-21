import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../../../services/api';

import { useToast } from '../../../../hooks/toast';

import getValidationErrors from '../../../../utils/getValidationErrors';

import Modal from '..';
import Loading from '../../../Loading';
import Button from '../../../Button';
import Input from '../../../Input';

import { Container, CloseModal } from './styles';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

interface AdminForgotPasswordFormData {
  ra: string;
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
          ra: Yup.string().required('RA obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        setLoading(true);

        await api.post('admins/password/forgot', {
          ra: data.ra,
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
          title: 'Erro ao enviar requisição',
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
              <Input name="ra" placeholder="RA" />

              <Button type="submit">Enviar</Button>
            </Form>
          ) : (
            <div>
              <strong>
                Uma requisição de senha foi enviada para o email cadastrado de
                acordo com o RA informado
              </strong>

              <Button
                type="button"
                onClick={() => {
                  setIsOpen();
                  setToSend(true);
                }}
              >
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
