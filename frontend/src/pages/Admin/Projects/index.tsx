import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { FiEdit2, FiFilter, FiSearch } from 'react-icons/fi';

import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';

import {
  Background,
  Container,
  SecondaryHeader,
  TableContainer,
  FilterContainer,
} from './styles';

import Header from '../../../components/Header';
import Loading from '../../../components/Loading';
import ProjectModal from '../../../components/Admin/Modal/ProjectModal';

import { IProjectOperationData } from '../Form/ProjectForm';

export interface ProjectData extends IProjectOperationData {
  id: string;
}

const Projects: React.FC = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [toRefresh, setToRefresh] = useState(true);

  const [filter, setFilter] = useState(1);
  const [projectSearch, setProjectSearch] = useState('');
  const [projects, setProjects] = useState<ProjectData[]>([]);

  const [selectedProject, setSelectedProject] = useState<ProjectData>(
    {} as ProjectData,
  );

  const [projectOpen, setProjectOpen] = useState(false);

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

    if (toRefresh) {
      loadData();
      setToRefresh(false);
    }
  }, [addToast, toRefresh]);

  const filteredProjects = useMemo(() => {
    switch (filter) {
      case 2: {
        return projects.filter(project => project.classroom.includes('E'));
      }
      case 3: {
        return projects.filter(project => project.classroom.includes('I'));
      }
      case 4: {
        return projects.filter(project => project.classroom.includes('M'));
      }
      default: {
        return projects;
      }
    }
  }, [filter, projects]);

  const toggleModalProject = useCallback(() => {
    setProjectOpen(!projectOpen);
  }, [projectOpen]);

  return (
    <>
      {loading && <Loading zIndex={1} />}

      <ProjectModal
        project={selectedProject}
        isOpen={projectOpen}
        setIsOpen={toggleModalProject}
        setToRefresh={setToRefresh}
      />

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

            <button type="button" onClick={() => history.push('project-form')}>
              <IoIosAddCircleOutline />
            </button>

            <FilterContainer selectedIndex={filter}>
              <button type="button" onClick={() => setFilter(1)}>
                Todos
              </button>
              <button type="button" onClick={() => setFilter(2)}>
                Eletrônica
              </button>
              <button type="button" onClick={() => setFilter(3)}>
                Informática
              </button>
              <button type="button" onClick={() => setFilter(4)}>
                Mecatrônica
              </button>
            </FilterContainer>

            <FiFilter />
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
              {filteredProjects.map(project => (
                <tr key={project.id}>
                  <td>{project.name}</td>
                  <td>{project.occupation_area}</td>
                  <td>{project.members}</td>
                  <td>{project.classroom}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedProject(project);
                        toggleModalProject();
                      }}
                    >
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
