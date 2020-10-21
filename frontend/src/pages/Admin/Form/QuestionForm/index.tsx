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

export interface IQuestionOperationsData {
  section: string;
  criterion: string;
  min_grade: number;
  max_grade: number;
}

const QuestionForm: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();

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

        await api.post('questions', questionData);

        addToast({
          type: 'success',
          title: 'Ficha de avaliação criada com sucesso',
        });

        history.push('/questions');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na criação da ficha de avaliação',
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
          <Link to="questions">
            <FontAwesomeIcon size="3x" icon={faChevronLeft} />
          </Link>
          <strong>Cadastro de ficha de avaliação</strong>
        </SecondaryHeader>

        <Container>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <InputsContainer>
              <strong>1. Nome da seção</strong>
              <Input name="section" type="text" placeholder="Seção" />

              <strong>3. Nota mínima</strong>
              <Input name="min_grade" type="number" placeholder="ex: 0" />
            </InputsContainer>

            <InputsContainer>
              <strong>2. Nome do critério</strong>
              <Input name="criterion" type="text" placeholder="Critério" />

              <strong>4. Nota máxima</strong>
              <Input name="max_grade" type="number" placeholder="ex: 10" />

              <Button type="submit">Criar</Button>
            </InputsContainer>
          </Form>
        </Container>
      </Background>
    </>
  );
};

export default QuestionForm;
