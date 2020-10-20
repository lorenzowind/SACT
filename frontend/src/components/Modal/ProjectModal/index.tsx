import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IoIosAdd } from 'react-icons/io';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FiTrash } from 'react-icons/fi';
import api from '../../../services/api';

import getValidationErrors from '../../../utils/getValidationErrors';
import getClassroomsArray from '../../../utils/getClassroomsArray';

import { useToast } from '../../../hooks/toast';

import Modal from '..';
import Loading from '../../Loading';
import Input from '../../Input';
import Button from '../../Button';
import Textarea from '../../Textarea';
import Select from '../../Select';

import { Container, CloseModal } from './styles';

import { IProjectOperationData } from '../../../pages/Admin/Form/ProjectForm';
import { ProjectData } from '../../../pages/Admin/Projects';

interface IModalProps {
  project: ProjectData;
  isOpen: boolean;
  setIsOpen: () => void;
  setToRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjectModal: React.FC<IModalProps> = ({
  project,
  isOpen,
  setIsOpen,
  setToRefresh,
}) => {
  const formRef = useRef<FormHandles>(null);

  const [loading, setLoading] = useState(false);

  const [classroomsArray] = useState(getClassroomsArray());

  const { addToast } = useToast();

  const handleDelete = useCallback(async () => {
    try {
      setLoading(true);

      await api.delete(`projects/${project.id}`);

      addToast({
        type: 'success',
        title: 'Projeto excluído com sucesso',
      });

      setIsOpen();
      setToRefresh(true);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro na exclusão do projeto',
      });
    } finally {
      setLoading(false);
    }
  }, [addToast, project.id, setIsOpen, setToRefresh]);

  const handleSubmit = useCallback(
    async (data: IProjectOperationData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required(),
          description: Yup.string().required(),
          members: Yup.string().required(),
          classroom: Yup.mixed().test('match', '', () => {
            return data.classroom !== '0';
          }),
          observations: Yup.string().required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

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
          members: data.members,
          observations: data.observations,
        };

        setLoading(true);

        await api.put(`projects/${project.id}`, projectData);

        addToast({
          type: 'success',
          title: 'Projeto alterado com sucesso',
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
          title: 'Erro na alteração do projeto',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, project.id, setIsOpen, setToRefresh],
  );

  return (
    <>
      {loading && <Loading zIndex={1} />}

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <CloseModal onClick={setIsOpen}>
          <strong>X</strong>
        </CloseModal>
        <Container>
          <strong>Editar Projeto</strong>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <strong>Nome do projeto</strong>
            <Input
              name="name"
              type="text"
              placeholder="Nome"
              defaultValue={project.name}
            />

            <strong>Descrição</strong>
            <Input
              name="description"
              type="text"
              placeholder="Título"
              defaultValue={project.description}
            />

            <strong>Turma</strong>
            <Select name="classroom" defaultValue={project.classroom}>
              <option value="0" disabled>
                Selecione turma
              </option>
              {classroomsArray.map(classroom => (
                <option key={classroom} value={classroom}>
                  {classroom}
                </option>
              ))}
            </Select>

            <strong>Integrantes</strong>
            <Input
              name="members"
              type="text"
              placeholder="Integrantes"
              defaultValue={project.members}
            />

            <strong>Observações</strong>
            <Textarea
              name="observations"
              placeholder="Observação"
              defaultValue={project.observations}
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

export default ProjectModal;
