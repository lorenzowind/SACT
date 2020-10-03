import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

import { Main } from './styles';
import { SactLogo } from '../../components/SactLogo';

const ProjectsView: React.FC = () => {
  interface IProject {
    id: string;
    name: string;
    occupation_area: string;
    classroom: string;
    members: string;
    observation: string;
    image_url: string;
    created_at: string;
    updated_at: string;
  }
  const project = {
    id: 'uuid-1',
    name: 'Project Name 1',
    occupation_area: 'Informática',
    classroom: '3ºAI',
    members: 'Member 1, Member 2, Member 3',
    observation:
      'Este projeto trata de uma solução de software para o interno da Fundação Matias Machline, que pretende auxiliar com eficiência o planejamento e organização das avaliações dos projetos de conclusão de curso.',
    image_url:
      'https://image_upload_provider/2196cf1aec2f18533aaf-file_name.png',
    created_at: '2020-07-02T21:57:00.421Z',
    updated_at: '2020-07-02T21:57:00.421Z',
  };

  return (
    <Main>
      <div>
        <FontAwesomeIcon size="2x" icon={faChevronLeft} />
        <SactLogo />
        <FontAwesomeIcon size="2x" icon={faChevronRight} />
      </div>
      <h1>{project.name}</h1>
      <h2>Integrantes</h2>
      {project.members.split(', ').map((member, index) => {
        return <p key={`member-${index}`}>{member}</p>;
      })}
      <h2>Área de atuação</h2>
      <p>{project.occupation_area}</p>
      <h2>Observações</h2>
      <p>{project.observation}</p>
    </Main>
  );
};

export default ProjectsView;
