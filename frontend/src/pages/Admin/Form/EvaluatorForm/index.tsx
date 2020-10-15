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
import Select from '../../../../components/Select';

export interface IEvaluatorOperationsData {
  name: string;
  occupation_area: 'Eletrônica' | 'Informática' | 'Mecatrônica' | '0';
  institution: string;
  phone_number: string;
  email: string;
}

const EvaluatorForm: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();

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

        await api.post('evaluators', evaluatorData);

        addToast({
          type: 'success',
          title: 'Avaliador criado com sucesso',
        });

        history.push('/evaluators');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na criação de avaliador',
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
          <Link to="evaluators">
            <FontAwesomeIcon size="3x" icon={faChevronLeft} />
          </Link>
          <strong>Cadastro de avaliador</strong>
        </SecondaryHeader>

        <Container>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <InputsContainer>
              <strong>1. Nome do avaliador</strong>
              <Input name="name" type="text" placeholder="Nome" />

              <strong>2. Área de atuação</strong>
              <Select name="occupation_area" defaultValue="0">
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
            </InputsContainer>

            <InputsContainer>
              <strong>3. Instituição</strong>
              <Input name="institution" type="text" placeholder="Instituição" />

              <strong>4. Número de telefone</strong>
              <Input name="phone_number" type="number" placeholder="Número" />

              <strong>5. Email</strong>
              <Input name="email" type="text" placeholder="Email" />

              <Button type="submit">Criar</Button>
            </InputsContainer>
          </Form>
        </Container>
      </Background>
    </>
  );
};

export default EvaluatorForm;
