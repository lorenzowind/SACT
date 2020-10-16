import React, { useCallback, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { IoIosAdd } from 'react-icons/io';

import api from '../../../../services/api';

import getValidationErrors from '../../../../utils/getValidationErrors';
import getClassroomsArray from '../../../../utils/getClassroomsArray';

import { useToast } from '../../../../hooks/toast';

import {
  Background,
  Container,
  SecondaryHeader,
  LeftContainer,
  RightContainer,
} from './styles';

import Header from '../../../../components/Header';
import Loading from '../../../../components/Loading';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Textarea from '../../../../components/Textarea';
import Select from '../../../../components/Select';

export interface IProjectOperationData {
  name: string;
  description: string;
  occupation_area: string;
  classroom: string;
  members: string;
  observations: string;
}

const ProjectForm: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const [currentMember, setCurrentMember] = useState('');
  const [members, setMembers] = useState<String[]>([]);

  const [classroomsArray] = useState(getClassroomsArray());

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: IProjectOperationData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required(),
          description: Yup.string().required(),
          classroom: Yup.mixed().test('match', '', () => {
            return data.classroom !== '0';
          }),
          observations: Yup.string().required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (!members.length) {
          throw new Error();
        }

        let occupation_area;

        if (data.classroom.includes('E')) {
          occupation_area = 'Eletrônica';
        } else if (data.classroom.includes('I')) {
          occupation_area = 'Informática';
        } else {
          occupation_area = 'Mecatrônica';
        }

        const projectData: IProjectOperationData = {
          name: data.name,
          description: data.description,
          occupation_area,
          classroom: data.classroom,
          members: members.join(', '),
          observations: data.observations,
        };

        setLoading(true);

        await api.post('projects', projectData);

        addToast({
          type: 'success',
          title: 'Projeto criado com sucesso',
        });

        history.push('/projects');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na criação de projeto',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, history, members],
  );

  const handleAddMember = useCallback(() => {
    if (currentMember !== '') {
      setMembers([...members, currentMember]);
      setCurrentMember('');
    }
  }, [currentMember, members]);

  const handleRemoveMember = useCallback((index: number) => {
    setMembers(state =>
      state.filter((_member, curIndex) => curIndex !== index),
    );
  }, []);

  return (
    <>
      {loading && <Loading zIndex={1} />}

      <Header />

      <Background>
        <SecondaryHeader>
          <Link to="projects">
            <FontAwesomeIcon size="3x" icon={faChevronLeft} />
          </Link>
          <strong>Cadastro de projeto</strong>
        </SecondaryHeader>

        <Container>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <LeftContainer>
              <strong>1. Nome do projeto</strong>
              <Input name="name" type="text" placeholder="Nome" />

              <strong>2. Descrição</strong>
              <Input name="description" type="text" placeholder="Título" />

              <strong>3. Turma</strong>
              <Select name="classroom" defaultValue="0">
                <option value="0" disabled>
                  Selecione turma
                </option>
                {classroomsArray.map(classroom => (
                  <option key={classroom} value={classroom}>
                    {classroom}
                  </option>
                ))}
              </Select>
            </LeftContainer>

            <RightContainer>
              <strong>4. Integrantes</strong>
              <div>
                <input
                  type="text"
                  placeholder="Nome"
                  value={currentMember}
                  onChange={e => setCurrentMember(e.target.value)}
                />
                <button type="button" onClick={handleAddMember}>
                  <IoIosAdd />
                </button>
              </div>
              <section>
                {members.map((member, index) => (
                  <nav key={`${member}_${index}`}>
                    <h2>{member}</h2>
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(index)}
                    >
                      X
                    </button>
                  </nav>
                ))}
              </section>

              <strong>5. Observações</strong>
              <Textarea name="observations" placeholder="Observação" />

              <Button type="submit">Criar</Button>
            </RightContainer>
          </Form>
        </Container>
      </Background>
    </>
  );
};

export default ProjectForm;
