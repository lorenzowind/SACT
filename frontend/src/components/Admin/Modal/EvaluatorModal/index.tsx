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
import Select from '../../../Select';

import { Container, CloseModal } from './styles';

import { IEvaluatorOperationsData } from '../../../../pages/Admin/Form/EvaluatorForm';
import { EvaluatorData } from '../../../../pages/Admin/Evaluators';

interface IModalProps {
  evaluator: EvaluatorData;
  isOpen: boolean;
  setIsOpen: () => void;
  setToRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const EvaluatorModal: React.FC<IModalProps> = ({
  evaluator,
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

      await api.delete(`evaluators/${evaluator.id}`);

      addToast({
        type: 'success',
        title: 'Avaliador excluído com sucesso',
      });

      setIsOpen();
      setToRefresh(true);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro na exclusão do avaliador',
      });
    } finally {
      setLoading(false);
    }
  }, [addToast, evaluator.id, setIsOpen, setToRefresh]);

  const handleSubmit = useCallback(
    async (data: IEvaluatorOperationsData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required(),
          occupation_area: Yup.mixed().test('match', '', () => {
            return data.occupation_area !== '0';
          }),
          institution: Yup.string().required(),
          phone_number: Yup.string().required(),
          email: Yup.string().email().required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const evaluatorData: IEvaluatorOperationsData = {
          name: data.name,
          occupation_area: data.occupation_area,
          institution: data.institution,
          phone_number: data.phone_number,
          email: data.email,
        };

        setLoading(true);

        await api.put(`evaluators/${evaluator.id}`, evaluatorData);

        addToast({
          type: 'success',
          title: 'Avaliador alterado com sucesso',
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
          title: 'Erro na alteração do avaliador',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, evaluator.id, setIsOpen, setToRefresh],
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
            <strong>Nome do avaliador</strong>
            <Input
              name="name"
              type="text"
              placeholder="Nome"
              defaultValue={evaluator.name}
            />

            <strong>Área de atuação</strong>
            <Select
              name="occupation_area"
              defaultValue={evaluator.occupation_area}
            >
              <option value="0" disabled>
                Selecione área de atuação
              </option>
              <option key="occupation_area_01" value="Eletrônica">
                Eletrônica
              </option>
              <option key="occupation_area_02" value="Informática">
                Informática
              </option>
              <option key="occupation_area_03" value="Mecatrônica">
                Mecatrônica
              </option>
            </Select>

            <strong>Instituição</strong>
            <Input
              name="institution"
              type="text"
              placeholder="Instituição"
              defaultValue={evaluator.institution}
            />

            <strong>Número de telefone</strong>
            <Input
              name="phone_number"
              type="number"
              placeholder="Número"
              defaultValue={evaluator.phone_number}
            />

            <strong>Email</strong>
            <Input
              name="email"
              type="text"
              placeholder="Email"
              defaultValue={evaluator.email}
            />

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

export default EvaluatorModal;
