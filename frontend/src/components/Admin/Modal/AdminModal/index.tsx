import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FiTrash } from 'react-icons/fi';
import api from '../../../../services/api';

import getValidationErrors from '../../../../utils/getValidationErrors';

import { useToast } from '../../../../hooks/toast';

import Modal from '..';
import Loading from '../../../Loading';
import Input from '../../../Input';
import Button from '../../../Button';

import { Container, CloseModal } from './styles';

import { IAdminOperationsData } from '../../../../pages/Admin/Form/AdminForm';
import { AdminData } from '../../../../pages/Admin/Admins';

interface IModalProps {
  admin: AdminData;
  isOpen: boolean;
  setIsOpen: () => void;
  setToRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminModal: React.FC<IModalProps> = ({
  admin,
  isOpen,
  setIsOpen,
  setToRefresh,
}) => {
  const formRef = useRef<FormHandles>(null);

  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();

  const handleDelete = useCallback(async () => {
    try {
      setLoading(true);

      await api.delete(`admins/${admin.id}`);

      addToast({
        type: 'success',
        title: 'Administrador excluído com sucesso',
      });

      setIsOpen();
      setToRefresh(true);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro na exclusão do administrador',
      });
    } finally {
      setLoading(false);
    }
  }, [addToast, admin.id, setIsOpen, setToRefresh]);

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

        await api.put(`admins/${admin.id}`, adminData);

        addToast({
          type: 'success',
          title: 'Administrador alterado com sucesso',
        });

        setIsOpen();
        setToRefresh(true);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na alteração do administrador',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, admin.id, setIsOpen, setToRefresh],
  );

  return (
    <>
      {loading && <Loading zIndex={1} />}

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <CloseModal onClick={setIsOpen}>
          <strong>X</strong>
        </CloseModal>

        <Container>
          <strong>Editar Administrador</strong>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <strong>Nome do administrador</strong>
            <Input
              name="name"
              type="text"
              placeholder="Nome"
              defaultValue={admin.name}
            />

            <strong>Email</strong>
            <Input
              name="email"
              type="text"
              placeholder="Email"
              defaultValue={admin.email}
            />

            <strong>RA</strong>
            <Input
              name="ra"
              type="number"
              placeholder="RA"
              defaultValue={admin.ra}
            />

            <strong>Senha</strong>
            <Input name="password" type="password" placeholder="Senha" />

            <nav>
              <button type="button" onClick={handleDelete}>
                <FiTrash />
              </button>

              <Button type="submit">Salvar</Button>
            </nav>
          </Form>
        </Container>
      </Modal>
    </>
  );
};

export default AdminModal;
