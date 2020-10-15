import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { IoIosAddCircleOutline } from 'react-icons/io';

import { FiEdit2, FiSearch } from 'react-icons/fi';
import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';

import {
  Background,
  Container,
  SecondaryHeader,
  TableContainer,
} from './styles';

import Header from '../../../components/Header';
import Loading from '../../../components/Loading';
import EvaluatorModal from '../../../components/Modal/EvaluatorModal';

import { IEvaluatorOperationsData } from '../Form/EvaluatorForm';

export interface EvaluatorData extends IEvaluatorOperationsData {
  id: string;
}

const Evaluators: React.FC = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [toRefresh, setToRefresh] = useState(true);

  const [evaluatorSearch, setEvaluatorSearch] = useState('');
  const [evaluators, setEvaluators] = useState<EvaluatorData[]>([]);

  const [evaluatorOpen, setEvaluatorOpen] = useState(false);

  const [selectedEvaluator, setSelectedEvaluator] = useState<EvaluatorData>(
    {} as EvaluatorData,
  );

  const { addToast } = useToast();

  const handleSearch = useCallback(async () => {
    try {
      setLoading(true);

      await api
        .get<EvaluatorData[]>(`evaluators/all?search=${evaluatorSearch}`)
        .then(response => {
          setEvaluators(response.data);

          if (!response.data.length) {
            addToast({
              type: 'info',
              title: 'Nenhum avaliador encontrado',
            });
          }
        });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro na busca por avaliadores',
      });
    } finally {
      setLoading(false);
    }
  }, [addToast, evaluatorSearch]);

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

    if (toRefresh) {
      loadData();
      setToRefresh(false);
    }
  }, [addToast, toRefresh]);

  const toggleModalEvaluator = useCallback(() => {
    setEvaluatorOpen(!evaluatorOpen);
  }, [evaluatorOpen]);

  return (
    <>
      {loading && <Loading zIndex={1} />}

      <EvaluatorModal
        evaluator={selectedEvaluator}
        isOpen={evaluatorOpen}
        setIsOpen={toggleModalEvaluator}
        setToRefresh={setToRefresh}
      />

      <Header />

      <Background>
        <SecondaryHeader>
          <Link to="dashboard">
            <FontAwesomeIcon size="3x" icon={faChevronLeft} />
          </Link>
          <strong>Avaliadores</strong>
        </SecondaryHeader>

        <Container>
          <form>
            <strong>Pesquisar avaliadores</strong>
            <div>
              <input
                type="text"
                placeholder="Nome"
                value={evaluatorSearch}
                onChange={e => setEvaluatorSearch(e.target.value)}
              />
              <button type="button" onClick={handleSearch}>
                <FiSearch />
              </button>
            </div>
          </form>
          <div>
            <strong>Adicionar avaliador</strong>

            <button
              type="button"
              onClick={() => history.push('evaluator-form')}
            >
              <IoIosAddCircleOutline />
            </button>
          </div>
          <TableContainer>
            <thead>
              <tr>
                <th>Avaliador</th>
                <th>Área de atuação</th>
                <th>Telefone</th>
                <th>Email</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {evaluators.map(evaluator => (
                <tr key={evaluator.id}>
                  <td>{evaluator.name}</td>
                  <td>{evaluator.occupation_area}</td>
                  <td>{evaluator.phone_number}</td>
                  <td>{evaluator.email}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedEvaluator(evaluator);
                        toggleModalEvaluator();
                      }}
                    >
                      <FiEdit2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </TableContainer>
        </Container>
      </Background>
    </>
  );
};

export default Evaluators;
