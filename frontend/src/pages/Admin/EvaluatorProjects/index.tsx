import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FiFilter, FiSearch } from 'react-icons/fi';

import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';
import { useEvaluatorProjects } from '../../../hooks/evaluatorProjects';

import {
  Background,
  Container,
  SecondaryHeader,
  FilterContainer,
  SelectedProjectContainer,
  SelectedProjectsContainer,
} from './styles';

import Header from '../../../components/Header';
import Loading from '../../../components/Loading';
import Button from '../../../components/Button';

import { ProjectData } from '../Projects';

interface ISelectedProjectData extends ProjectData {
  isSelected: boolean;
}

interface ProjectAvaliationData {
  project_id: string;
}

interface IAvaliationOperationsData {
  evaluator_id: string;
  projects: ProjectAvaliationData[];
}

interface IAvaliationsData {
  project_id: string;
}

const EvaluatorProjects: React.FC = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const [filter, setFilter] = useState(1);
  const [projectSearch, setProjectSearch] = useState('');
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<
    ISelectedProjectData[]
  >([]);

  const { addToast } = useToast();
  const {
    selectedEvaluatorState,
    setSelectedEvaluatorState,
  } = useEvaluatorProjects();

  const handleSubmit = useCallback(async () => {
    try {
      const avaliationData: IAvaliationOperationsData = {
        evaluator_id: selectedEvaluatorState.id,
        projects: selectedProjects.reduce(
          (projectsArray: ProjectAvaliationData[], selectedProject) => {
            if (selectedProject.isSelected) {
              projectsArray.push({
                project_id: selectedProject.id,
              });
            }
            return projectsArray;
          },
          [],
        ),
      };

      setLoading(true);

      await api.post('avaliations', avaliationData);

      addToast({
        type: 'success',
        title: 'Os projetos do avaliador foram salvos com sucesso',
      });

      history.push('evaluators');
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao salvar os projetos do avaliador',
      });
    } finally {
      setLoading(false);
    }
  }, [addToast, history, selectedEvaluatorState.id, selectedProjects]);

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

  const handleClickProject = useCallback((id: string) => {
    setSelectedProjects(state =>
      state.map(selectedProject => {
        if (selectedProject.id === id) {
          return {
            ...selectedProject,
            isSelected: !selectedProject.isSelected,
          };
        }

        return selectedProject;
      }),
    );
  }, []);

  useEffect(() => {
    if (!selectedEvaluatorState.id) {
      history.push('evaluators');
    }
  }, [addToast, history, selectedEvaluatorState]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        await api.get<ProjectData[]>('projects/all').then(response => {
          setProjects(response.data);

          setSelectedProjects(
            response.data.map(project => {
              return {
                ...project,
                isSelected: false,
              };
            }),
          );
        });

        await api
          .get<IAvaliationsData[]>(`avaliations/${selectedEvaluatorState.id}`)
          .then(response => {
            setSelectedProjects(state =>
              state.map(selectedProject => {
                const toShowSelected = response.data.find(
                  project => project.project_id === selectedProject.id,
                );
                if (toShowSelected) {
                  return {
                    ...selectedProject,
                    isSelected: true,
                  };
                }

                return selectedProject;
              }),
            );
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
  }, [addToast, selectedEvaluatorState.id]);

  const filteredProjects = useMemo(() => {
    switch (filter) {
      case 2: {
        return selectedProjects.filter(selectedProject => {
          return projects.find(
            project =>
              project.id === selectedProject.id &&
              project.classroom.includes('E'),
          );
        });
      }
      case 3: {
        return selectedProjects.filter(selectedProject => {
          return projects.find(
            project =>
              project.id === selectedProject.id &&
              project.classroom.includes('I'),
          );
        });
      }
      case 4: {
        return selectedProjects.filter(selectedProject => {
          return projects.find(
            project =>
              project.id === selectedProject.id &&
              project.classroom.includes('M'),
          );
        });
      }
      default: {
        return selectedProjects.filter(selectedProject => {
          return projects.find(project => project.id === selectedProject.id);
        });
      }
    }
  }, [filter, projects, selectedProjects]);

  return (
    <>
      {loading && <Loading zIndex={1} />}

      <Header />

      <Background>
        <SecondaryHeader>
          <Link to="evaluators">
            <FontAwesomeIcon size="3x" icon={faChevronLeft} />
          </Link>
          <strong>Projetos do avaliador</strong>
        </SecondaryHeader>

        <Container>
          <section>
            <strong>
              Nome do administrador: <b>{selectedEvaluatorState.name}</b>
            </strong>
            <br />
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
          </section>

          <nav>
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
          </nav>

          <SelectedProjectsContainer>
            {filteredProjects.map((project, index) => (
              <SelectedProjectContainer
                key={project.id}
                isSelected={project.isSelected}
                onClick={() => handleClickProject(project.id)}
                isLeftPositionated={index % 5 === 0 || index === 0}
                isRightPositionated={(index + 1) % 5 === 0 && index !== 0}
              >
                <strong>{project.name}</strong>
              </SelectedProjectContainer>
            ))}
          </SelectedProjectsContainer>

          <Button type="button" onClick={handleSubmit}>
            Salvar
          </Button>
        </Container>
      </Background>
    </>
  );
};

export default EvaluatorProjects;
