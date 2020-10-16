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
import InfoModal from '../../../components/Modal/InfoModal';

import iconTrophy from '../../../assets/icon_trophy.png';
import iconReport from '../../../assets/icon_report.png';
import iconInfo from '../../../assets/icon_info.png';

interface EvaluatorData {
  id: string;
  status: 'to_evaluate' | 'rated';
}

type AvaliationData = EvaluatorData;

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const [evaluators, setEvaluators] = useState<EvaluatorData[]>([]);
  const [avaliations, setAvaliations] = useState<AvaliationData[]>([]);

  const [infoOpen, setInfoOpen] = useState(false);

  const { addToast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        await api.get<AvaliationData[]>('avaliations/all').then(response => {
          setAvaliations(response.data);
        });

        await api.get<EvaluatorData[]>('evaluators/all').then(response => {
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

  return (
    <>
      {loading && <Loading zIndex={1} />}

      <InfoModal
        text="Funcionalidade ainda não implementada!"
        isOpen={infoOpen}
        setIsOpen={toggleModalInfo}
      />

      <Header />

      <Background>
        <Container>
          <LeftContainer>
            <RankingContainer onClick={toggleModalInfo}>
              <img src={iconTrophy} alt="Trophy" />
              <strong>Ranking</strong>
            </RankingContainer>

            <AvaliationsContainer onClick={toggleModalInfo}>
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
                  <button type="button" onClick={toggleModalInfo}>
                    <FiDownload />
                  </button>
                </section>
                <section>
                  <strong>Relatório ranking por curso</strong>
                  <button type="button" onClick={toggleModalInfo}>
                    <FiDownload />
                  </button>
                </section>
                <section>
                  <strong>Relatório ranking por nota</strong>
                  <button type="button" onClick={toggleModalInfo}>
                    <FiDownload />
                  </button>
                </section>
              </nav>
            </ReportsContainer>

            <section>
              <EvaluatorsContainer onClick={toggleModalInfo}>
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
