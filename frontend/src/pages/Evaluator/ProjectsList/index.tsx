import React, { useCallback, useEffect, useState } from 'react';
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
import InfoModal from '../../../components/Evaluator/Modal/InfoModal';

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

  const [textInfo, setTextInfo] = useState('');
  const [infoOpen, setInfoOpen] = useState(false);

  const toggleModalInfo = useCallback(() => {
    setInfoOpen(!infoOpen);
  }, [infoOpen]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        await api
          .get<AvaliationData[]>(`avaliations/${evaluator.id}`)
          .then(response => {
            setAvaliations(response.data);

            if (!response.data.length) {
              setTextInfo(
                'ATENÇÃO! Você não possui fichas de avaliação no momento!',
              );
            } else {
              const toEvaluateExists = response.data.find(
                avaliation => avaliation.status === 'to_evaluate',
              );

              if (!toEvaluateExists) {
                setTextInfo(
                  'PARABÉNS! Você concluiu todas as suas fichas de avaliação!',
                );
              }
            }
          });
      } catch (err) {
        setTextInfo(
          'ATENÇÃO! Não foi possível carregar as fichas de avaliação!',
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [evaluator.id, textInfo]);

  useEffect(() => {
    if (textInfo) {
      setInfoOpen(true);
    }
  }, [textInfo]);

  return (
    <>
      {loading && <Loading zIndex={1} />}

      <InfoModal
        text={textInfo}
        isOpen={infoOpen}
        setIsOpen={toggleModalInfo}
      />

      <Background>
        <Main>
          {avaliations.map(avaliation => {
            return (
              <CardContainer
                key={avaliation.id}
                onClick={() => {
                  if (avaliation.status !== 'rated') {
                    setSelectedAvaliationState(avaliation);
                    history.push('project-info');
                  }
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
          })}
        </Main>
      </Background>
    </>
  );
};

export default ProjectsList;
