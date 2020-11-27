import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiDownload } from 'react-icons/fi';

import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';

import {
  Background,
  Container,
  AvaliationsContainer,
  EvaluatorsContainer,
  InfoContainer,
  LeftContainer,
  RankingContainer,
  ReportsContainer,
  RightContainer,
} from './styles';

import Header from '../../../components/Header';
import Loading from '../../../components/Loading';
import AvaliationsProgressModal from '../../../components/Admin/Modal/AvaliationsProgressModal';
import EvaluatorsProgressModal from '../../../components/Admin/Modal/EvaluatorsProgressModal';

import iconTrophy from '../../../assets/icon_trophy.png';
import iconReport from '../../../assets/icon_report.png';
import iconInfo from '../../../assets/icon_info.png';

import { EvaluatorData } from '../Evaluators';
import { ProjectData } from '../Projects';

export interface Evaluator extends EvaluatorData {
  status: 'to_evaluate' | 'rated';
}

export interface Avaliation {
  id: string;
  evaluator_id: string;
  project: ProjectData;
  status: 'to_evaluate' | 'rated';
}

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const [evaluators, setEvaluators] = useState<Evaluator[]>([]);
  const [avaliations, setAvaliations] = useState<Avaliation[]>([]);

  const [infoOpen, setInfoOpen] = useState(false);
  const [avaliationsProgressOpen, setAvaliationsProgressOpen] = useState(false);
  const [evaluatorsProgressOpen, setEvaluatorsProgressOpen] = useState(false);

  const { addToast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        await api.get<Avaliation[]>('avaliations/all').then(response => {
          setAvaliations(response.data);
        });

        await api.get<Evaluator[]>('evaluators/all').then(response => {
          setEvaluators(response.data);
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na busca por avaliadores/fichas de avaliação',
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [addToast]);

  const concludedEvaluators = useMemo(() => {
    return evaluators.filter(evaluator => evaluator.status === 'rated').length;
  }, [evaluators]);

  const concludedAvaliations = useMemo(() => {
    return avaliations.filter(avaliation => avaliation.status === 'rated')
      .length;
  }, [avaliations]);

  const toggleModalInfo = useCallback(() => {
    setInfoOpen(!infoOpen);
  }, [infoOpen]);

  const toggleModalAvaliationsProgress = useCallback(() => {
    setAvaliationsProgressOpen(!avaliationsProgressOpen);
  }, [avaliationsProgressOpen]);

  const toggleModalEvaluatorsProgress = useCallback(() => {
    setEvaluatorsProgressOpen(!evaluatorsProgressOpen);
  }, [evaluatorsProgressOpen]);

  const handleDownloadGeneralRankingReport = useCallback(async () => {
    try {
      setLoading(true);

      await api.get('reports/general').then(response => {
        window.open(response.data, '_blank');
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao fazer donwload do relatório geral',
      });
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  const handleDownloadCourseRankingReport = useCallback(async () => {
    try {
      setLoading(true);

      await api.get('reports/course').then(response => {
        window.open(response.data, '_blank');
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao fazer donwload do relatório por cursos',
      });
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  return (
    <>
      {loading && <Loading zIndex={1} />}

      <AvaliationsProgressModal
        avaliations={avaliations}
        isOpen={avaliationsProgressOpen}
        setIsOpen={toggleModalAvaliationsProgress}
      />

      <EvaluatorsProgressModal
        evaluators={evaluators}
        avaliations={avaliations}
        isOpen={evaluatorsProgressOpen}
        setIsOpen={toggleModalEvaluatorsProgress}
      />

      <Header />

      <Background>
        <Container>
          <LeftContainer>
            <RankingContainer onClick={toggleModalInfo}>
              <img src={iconTrophy} alt="Trophy" />
              <strong>Ranking</strong>
            </RankingContainer>

            <AvaliationsContainer onClick={toggleModalAvaliationsProgress}>
              <strong>
                <b>{concludedAvaliations}</b>
                {`/${avaliations.length}`}
              </strong>
              <h2>Fichas já avaliadas</h2>
            </AvaliationsContainer>
          </LeftContainer>

          <RightContainer>
            <ReportsContainer>
              <article>
                <img src={iconReport} alt="Report" />
                <strong>Relatórios</strong>
              </article>
              <nav>
                <section>
                  <strong>Relatório ranking geral</strong>
                  <button
                    type="button"
                    onClick={handleDownloadGeneralRankingReport}
                  >
                    <FiDownload />
                  </button>
                </section>
                <section>
                  <strong>Relatório ranking por curso</strong>
                  <button
                    type="button"
                    onClick={handleDownloadCourseRankingReport}
                  >
                    <FiDownload />
                  </button>
                </section>
              </nav>
            </ReportsContainer>

            <section>
              <EvaluatorsContainer onClick={toggleModalEvaluatorsProgress}>
                <strong>
                  <b>{concludedEvaluators}</b>
                  {`/${evaluators.length}`}
                </strong>
                <h2>Avaliadores já concluiram</h2>
              </EvaluatorsContainer>

              <InfoContainer>
                <article>
                  <img src={iconInfo} alt="Info" />
                  <strong>Informações</strong>
                </article>
                <nav>
                  <Link to="evaluators">Avaliadores</Link>
                  <Link to="projects">Projetos</Link>
                  <Link to="questions">Fichas de Avaliação</Link>
                  <Link to="admins">Administradores</Link>
                </nav>
              </InfoContainer>
            </section>
          </RightContainer>
        </Container>
      </Background>
    </>
  );
};

export default Dashboard;
