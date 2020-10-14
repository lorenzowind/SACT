import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { IoIosAddCircleOutline } from 'react-icons/io';

import { FiEdit2 } from 'react-icons/fi';
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

interface QuestionData {
  id: string;
  section: string;
  criterion: string;
}

const Questions: React.FC = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const [questions, setQuestions] = useState<QuestionData[]>([]);

  const { addToast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        await api.get<QuestionData[]>('questions/all').then(response => {
          setQuestions(response.data);
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na busca por fichas de avaliação',
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
          <strong>Fichas de avaliação</strong>
        </SecondaryHeader>

        <Container>
          <div>
            <strong>Adicionar ficha de avaliação</strong>

            <button type="button">
              <IoIosAddCircleOutline />
            </button>
          </div>
          <TableContainer>
            <thead>
              <tr>
                <th>Seção</th>
                <th>Critério</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {questions.map(question => (
                <tr key={question.id}>
                  <td>{question.section}</td>
                  <td>{question.criterion}</td>
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

export default Questions;
