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

import { IQuestionOperationsData } from '../../../../pages/Admin/Form/QuestionForm';
import { QuestionData } from '../../../../pages/Admin/Questions';

interface IModalProps {
  question: QuestionData;
  isOpen: boolean;
  setIsOpen: () => void;
  setToRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuestionModal: React.FC<IModalProps> = ({
  question,
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

      await api.delete(`questions/${question.id}`);

      addToast({
        type: 'success',
        title: 'Ficha de avaliação excluída com sucesso',
      });

      setIsOpen();
      setToRefresh(true);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro na exclusão da ficha de avaliação',
      });
    } finally {
      setLoading(false);
    }
  }, [addToast, question.id, setIsOpen, setToRefresh]);

  const handleSubmit = useCallback(
    async (data: IQuestionOperationsData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          section: Yup.string().required(),
          criterion: Yup.string().required(),
          min_grade: Yup.number().required(),
          max_grade: Yup.number().required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const questionData: IQuestionOperationsData = {
          section: data.section,
          criterion: data.criterion,
          min_grade: data.min_grade,
          max_grade: data.max_grade,
        };

        setLoading(true);

        await api.put(`questions/${question.id}`, questionData);

        addToast({
          type: 'success',
          title: 'Ficha de avaliação alterada com sucesso',
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
          title: 'Erro na alteração da ficha de avaliação',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, question.id, setIsOpen, setToRefresh],
  );

  return (
    <>
      {loading && <Loading zIndex={1} />}

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <CloseModal onClick={setIsOpen}>
          <strong>X</strong>
        </CloseModal>

        <Container>
          <strong>Editar ficha de avaliação</strong>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <strong>Nome da seção</strong>
            <Input
              name="section"
              type="text"
              placeholder="Seção"
              defaultValue={question.section}
            />

            <strong>Nome do critério</strong>
            <Input
              name="criterion"
              type="text"
              placeholder="Critério"
              defaultValue={question.criterion}
            />

            <strong>Nota mínima</strong>
            <Input
              name="min_grade"
              type="number"
              placeholder="ex: 0"
              defaultValue={question.min_grade}
            />

            <strong>Nota máxima</strong>
            <Input
              name="max_grade"
              type="number"
              placeholder="ex: 10"
              defaultValue={question.max_grade}
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

export default QuestionModal;
