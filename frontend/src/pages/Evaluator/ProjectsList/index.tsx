import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../../services/api';

import {
  Background,
  Main,
  BasicCard,
  CardContainer,
  TitleCard,
} from './styles';

import { useEvaluatorAuth } from '../../../hooks/evaluatorAuth';
import { useEvaluatorAvaliation } from '../../../hooks/evaluatorAvaliation';

import Loading from '../../../components/Loading';

export interface AvaliationData {
  id: string;
  project: {
    name: string;
    description: string;
    occupation_area: string;
    classroom: string;
    members: string;
    observations: string;
  };
  status: 'to_evaluate' | 'rated';
}

const ProjectsList: React.FC = () => {
  const history = useHistory();

  const { evaluator } = useEvaluatorAuth();
  const { setSelectedAvaliationState } = useEvaluatorAvaliation();

  const [avaliations, setAvaliations] = useState<AvaliationData[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        await api
          .get<AvaliationData[]>(`avaliations/${evaluator.id}`)
          .then(response => {
            setAvaliations(response.data);

            if (!response.data.length) {
              setEmpty(true);
            }
          });
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [evaluator.id]);

  return (
    <>
      {loading && <Loading zIndex={1} />}

      <Background>
        <Main>
          {empty ? (
            <strong>Não há projetos para avaliar</strong>
          ) : (
            avaliations.map(avaliation => {
              return (
                <CardContainer
                  key={avaliation.id}
                  onClick={() => {
                    setSelectedAvaliationState(avaliation);
                    history.push('project-info');
                  }}
                >
                  <div>
                    <BasicCard>
                      <div>
                        <TitleCard done={avaliation.status === 'rated'}>
                          {avaliation.project.name}
                        </TitleCard>

                        <div>
                          <h1>{avaliation.project.classroom}</h1>
                          <p>{avaliation.project.occupation_area}</p>
                        </div>
                      </div>

                      {avaliation.project.members
                        .split(', ')
                        .map((member, indexMember) => {
                          return <p key={`member-${indexMember}`}>{member}</p>;
                        })}
                    </BasicCard>
                  </div>
                </CardContainer>
              );
            })
          )}

          {error && <strong>Erro na busca por projetos</strong>}
        </Main>
      </Background>
    </>
  );
};

export default ProjectsList;
