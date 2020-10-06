import React from 'react';
import { useHistory } from 'react-router-dom';

import {
  Background,
  Main,
  BasicCard,
  CardContainer,
  TitleCard,
} from './styles';

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

const ProjectsList: React.FC = () => {
  const history = useHistory();

  return (
    <Background>
      <Main>
        {projects.map((project, index) => {
          return (
            <CardContainer
              key={`${index}:${project.id}`}
              onClick={() => {
                history.push('project-info');
              }}
            >
              <div>
                <BasicCard>
                  <div>
                    <TitleCard done={false}>{project.name}</TitleCard>

                    <div>
                      <h1>{project.classroom}</h1>
                      <p>{project.occupation_area}</p>
                    </div>
                  </div>

                  {project.members.split(', ').map((member, indexMember) => {
                    return <p key={`member-${indexMember}`}>{member}</p>;
                  })}
                </BasicCard>
              </div>
            </CardContainer>
          );
        })}
      </Main>
    </Background>
  );
};

export default ProjectsList;
