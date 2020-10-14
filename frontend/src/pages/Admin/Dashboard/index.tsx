import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

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

import iconTrophy from '../../../assets/icon_trophy.png';
import iconReport from '../../../assets/icon_report.png';
import iconInfo from '../../../assets/icon_info.png';

interface EvaluatorData {
  id: string;
  status: 'to_evaluate' | 'rated';
}

const Dashboard: React.FC = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const [evaluators, setEvaluators] = useState<EvaluatorData[]>([]);

  const { addToast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        await api.get<EvaluatorData[]>('evaluators/all').then(response => {
          setEvaluators(response.data);
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na busca por avaliadores',
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

  return (
    <>
      {loading && <Loading zIndex={1} />}

      <Header />

      <Background>
        <Container>
          <LeftContainer>
            <RankingContainer>
              <img src={iconTrophy} alt="Trophy" />
              <strong>Ranking</strong>
            </RankingContainer>

            <AvaliationsContainer>
              <strong>
                <b>32</b>/50
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
                  <button type="button">
                    <FiDownload />
                  </button>
                </section>
                <section>
                  <strong>Relatório ranking por curso</strong>
                  <button type="button">
                    <FiDownload />
                  </button>
                </section>
                <section>
                  <strong>Relatório ranking por nota</strong>
                  <button type="button">
                    <FiDownload />
                  </button>
                </section>
              </nav>
            </ReportsContainer>

            <section>
              <EvaluatorsContainer>
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
                  <Link to="avaliations">Fichas de Avaliação</Link>
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
