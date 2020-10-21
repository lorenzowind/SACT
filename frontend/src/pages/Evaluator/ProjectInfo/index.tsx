import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { Main } from './styles';

import logoImg from '../../../assets/logo.png';

import { useEvaluatorAvaliation } from '../../../hooks/evaluatorAvaliation';

const ProjectInfo: React.FC = () => {
  const history = useHistory();

  const { selectedAvaliationState } = useEvaluatorAvaliation();

  useEffect(() => {
    if (!selectedAvaliationState.id) {
      history.push('projects-list');
    }
  }, [history, selectedAvaliationState]);

  return (
    <Main>
      <div>
        <FontAwesomeIcon
          size="2x"
          icon={faChevronLeft}
          onClick={() => {
            history.goBack();
          }}
        />

        <img src={logoImg} alt="SACT Logo" />
      </div>

      <h1>
        {selectedAvaliationState.id && selectedAvaliationState.project.name}
      </h1>

      <h2>Descrição</h2>
      <p>
        {selectedAvaliationState.id &&
          selectedAvaliationState.project.description}
      </p>

      <h2>Integrantes</h2>
      {selectedAvaliationState.id &&
        selectedAvaliationState.project.members
          .split(', ')
          .map((member, index) => {
            return <p key={`member-${index}`}>{member}</p>;
          })}

      <h2>Área de atuação</h2>
      <p>
        {selectedAvaliationState.id &&
          selectedAvaliationState.project.occupation_area}
      </p>

      <h2>Observações</h2>
      <p>
        {selectedAvaliationState.id &&
          selectedAvaliationState.project.observations}
      </p>

      <button type="button" onClick={() => history.push('project-avaliation')}>
        Iniciar avaliação
      </button>
    </Main>
  );
};

export default ProjectInfo;
