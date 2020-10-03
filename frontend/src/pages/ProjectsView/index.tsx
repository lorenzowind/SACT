import React from 'react';

import { PaperBackground } from '../../components/PaperBackground';
import ProjectCard from '../../components/ProjectCard';
import { Main } from './styles';

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
  const projects: IProject[] = [
    {
      id: 'uuid-1',
      name: 'Project Name 1',
      occupation_area: 'Informática',
      classroom: '3ºAI',
      members: 'Member 1, Member 2, Member 3',
      observation: 'Project observation',
      image_url:
        'https://image_upload_provider/2196cf1aec2f18533aaf-file_name.png',
      created_at: '2020-07-02T21:57:00.421Z',
      updated_at: '2020-07-02T21:57:00.421Z',
    },
    {
      id: 'uuid-2',
      name: 'Project Name 2',
      occupation_area: 'Informática',
      classroom: '3ºBI',
      members: 'Member 1, Member 2, Member 3',
      observation: 'Project observation',
      image_url:
        'https://image_upload_provider/2196cf1aec2f18533aaf-file_name.png',
      created_at: '2020-07-02T21:57:00.421Z',
      updated_at: '2020-07-02T21:57:00.421Z',
    },
    {
      id: 'uuid-3',
      name: 'Project Name 3',
      occupation_area: 'Informática',
      classroom: '3ºCI',
      members: 'Member 1, Member 2, Member 3',
      observation: 'Project observation',
      image_url:
        'https://image_upload_provider/2196cf1aec2f18533aaf-file_name.png',
      created_at: '2020-07-02T21:57:00.421Z',
      updated_at: '2020-07-02T21:57:00.421Z',
    },
  ];

  return (
    <PaperBackground>
      <Main>
        <ProjectCard project={projects[0]} done />
        {projects.map((project, index) => {
          return (
            <ProjectCard project={project} key={`${index}:${project.id}`} />
          );
        })}
      </Main>
    </PaperBackground>
  );
};

export default ProjectsView;
