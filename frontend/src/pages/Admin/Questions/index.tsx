import React, { useCallback, useEffect, useState } from 'react';
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
import QuestionModal from '../../../components/Modal/QuestionModal';

import { IQuestionOperationsData } from '../Form/QuestionForm';

export interface QuestionData extends IQuestionOperationsData {
  id: string;
}

const Questions: React.FC = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [toRefresh, setToRefresh] = useState(true);

  const [questions, setQuestions] = useState<QuestionData[]>([]);

  const [questionOpen, setQuestionOpen] = useState(false);

  const [selectedQuestion, setSelectedQuestion] = useState<QuestionData>(
    {} as QuestionData,
  );

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

    if (toRefresh) {
      loadData();
      setToRefresh(false);
    }
  }, [addToast, toRefresh]);

  const toggleModalQuestion = useCallback(() => {
    setQuestionOpen(!questionOpen);
  }, [questionOpen]);

  return (
    <>
      {loading && <Loading zIndex={1} />}

      <QuestionModal
        question={selectedQuestion}
        isOpen={questionOpen}
        setIsOpen={toggleModalQuestion}
        setToRefresh={setToRefresh}
      />

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

            <button type="button" onClick={() => history.push('question-form')}>
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
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedQuestion(question);
                        toggleModalQuestion();
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

export default Questions;
