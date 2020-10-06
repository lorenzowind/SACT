import React from 'react';

import { Container } from './styles';

interface CourserProps {
  courser: string;
  firstProject: string;
  secondProject: string;
  thirdProject: string;
  sigla: string;
  spaceTop: number;
}

const ContainerRanking: React.FC<CourserProps> = ({
  courser,
  firstProject,
  secondProject,
  thirdProject,
  sigla,
  spaceTop,
}) => {
  return (
    <Container style={{ gridArea: sigla, marginTop: spaceTop }}>
      <h1>{courser}</h1>
      <ul>
        <li>1° {firstProject}</li>
        <li>2° {secondProject}</li>
        <li>3° {thirdProject}</li>
      </ul>
    </Container>
  );
};

export default ContainerRanking;
