import React from 'react';
import { BasicCard, CardContainer, TitleCard } from './styles';

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

interface ProjectCardProps {
  project: IProject;
  done?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, done = false }) => {
  return (
    <CardContainer>
      <div>
        <BasicCard>
          <div>
            <TitleCard done={done}>{project.name}</TitleCard>
            <div>
              <h1>{project.classroom}</h1>
              <p>{project.occupation_area}</p>
            </div>
          </div>
          {project.members.split(', ').map((member, index) => {
            return <p key={`member-${index}`}>{member}</p>;
          })}
        </BasicCard>
      </div>
    </CardContainer>
  );
};

export default ProjectCard;
