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

interface EvaluatorData {
  id: string;
  name: string;
  occupation_area: string;
  institution: string;
  phone_number: string;
  email: string;
  status: string;
}

const Evaluators: React.FC = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const [evaluatorSearch, setEvaluatorSearch] = useState('');
  const [evaluators, setEvaluators] = useState<EvaluatorData[]>([]);

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

    loadData();
  }, [addToast]);

  return (
    <>
      {loading && <Loading zIndex={1} />}

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

            <button type="button">
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
                    <button type="button">
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
