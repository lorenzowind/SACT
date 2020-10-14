import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { IoIosAddCircleOutline } from 'react-icons/io';

import { FiEdit2, FiSearch } from 'react-icons/fi';
import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';

import {
  Background,
  Container,
  SecondaryHeader,
  TableContainer,
} from './styles';

import Header from '../../../components/Header';
import Loading from '../../../components/Loading';

interface ProjectData {
  id: string;
  name: string;
  description: string;
  occupation_area: string;
  classroom: string;
  members: string;
  observations: string;
}

const Projects: React.FC = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const [projectSearch, setProjectSearch] = useState('');
  const [projects, setProjects] = useState<ProjectData[]>([]);

  const { addToast } = useToast();

  const handleSearch = useCallback(async () => {
    try {
      setLoading(true);

      await api
        .get<ProjectData[]>(`projects/all?search=${projectSearch}`)
        .then(response => {
          setProjects(response.data);

          if (!response.data.length) {
            addToast({
              type: 'info',
              title: 'Nenhum projeto encontrado',
            });
          }
        });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro na busca por projetos',
      });
    } finally {
      setLoading(false);
    }
  }, [addToast, projectSearch]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        await api.get<ProjectData[]>('projects/all').then(response => {
          setProjects(response.data);
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na busca por projetos',
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [addToast]);

  return (
    <>
      {loading && <Loading zIndex={1} />}

      <Header />

      <Background>
        <SecondaryHeader>
          <Link to="dashboard">
            <FontAwesomeIcon size="3x" icon={faChevronLeft} />
          </Link>
          <strong>Projetos</strong>
        </SecondaryHeader>

        <Container>
          <form>
            <strong>Pesquisar projetos</strong>
            <div>
              <input
                type="text"
                placeholder="Nome"
                value={projectSearch}
                onChange={e => setProjectSearch(e.target.value)}
              />
              <button type="button" onClick={handleSearch}>
                <FiSearch />
              </button>
            </div>
          </form>
          <div>
            <strong>Adicionar projeto</strong>

            <button type="button">
              <IoIosAddCircleOutline />
            </button>
          </div>
          <TableContainer>
            <thead>
              <tr>
                <th>Projeto</th>
                <th>Área de atuação</th>
                <th>Integrantes</th>
                <th>Turma</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project.id}>
                  <td>{project.name}</td>
                  <td>{project.occupation_area}</td>
                  <td>{project.members}</td>
                  <td>{project.classroom}</td>
                  <td>
                    <button type="button">
                      <FiEdit2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </TableContainer>
        </Container>
      </Background>
    </>
  );
};

export default Projects;
