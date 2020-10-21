import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import api from '../../../services/api';

import {
  Background,
  Main,
  QuestionContainer,
  CriterionContainer,
  ScoreContainer,
} from './styles';

import { useEvaluatorAvaliation } from '../../../hooks/evaluatorAvaliation';

import Loading from '../../../components/Loading';
import SliderInput from '../../../components/Slider';

interface QuestionData {
  id: string;
  section: string;
  criterion: string;
}

interface QuestionFormat {
  section: string;
  criterions: {
    name: string;
    question_id: string;
    grade: number;
  }[];
}

interface GradeFormat {
  question_id: string;
  grade: number;
}

interface GradesRequest {
  avaliation_id: string;
  comments: string;
  grades: GradeFormat[];
}

const ProjectInfo: React.FC = () => {
  const history = useHistory();

  const { selectedAvaliationState } = useEvaluatorAvaliation();

  const [questions, setQuestions] = useState<QuestionFormat[]>([]);
  const [comments, setComments] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        await api.get<QuestionData[]>('questions/all').then(response => {
          setQuestions(
            response.data.reduce((newQuestions: QuestionFormat[], question) => {
              const existentQuestion = newQuestions.find(
                newQuestion => newQuestion.section === question.section,
              );
              if (existentQuestion) {
                existentQuestion.criterions.push({
                  name: question.criterion,
                  question_id: question.id,
                  grade: 60,
                });
              } else {
                newQuestions.push({
                  section: question.section,
                  criterions: [
                    {
                      name: question.criterion,
                      question_id: question.id,
                      grade: 60,
                    },
                  ],
                });
              }

              return newQuestions;
            }, []),
          );
        });
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (!selectedAvaliationState.id) {
      history.push('projects-list');
    } else {
      loadData();
    }
  }, [history, selectedAvaliationState]);

  const handleTransformGrade = useCallback((grade: number) => {
    return `${String(grade).substring(0, String(grade).length - 1)}.${String(
      grade,
    ).substring(String(grade).length - 1, String(grade).length)}`;
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);

      const gradesData: GradesRequest = {
        avaliation_id: selectedAvaliationState.id,
        comments,
        grades: questions.reduce((grades: GradeFormat[], question) => {
          question.criterions.forEach(criterion => {
            grades.push({
              question_id: criterion.question_id,
              grade: Number(handleTransformGrade(criterion.grade)),
            });
          });

          return grades;
        }, []),
      };

      await api.post('grades', gradesData);

      history.push('projects-list');
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [
    comments,
    handleTransformGrade,
    history,
    questions,
    selectedAvaliationState.id,
  ]);

  const handleDecreaseGrade = useCallback((index, criterionIndex) => {
    setQuestions(state =>
      state.reduce((newQuestions: QuestionFormat[], question, curIndex) => {
        newQuestions.push({
          section: question.section,
          criterions: question.criterions.map(
            (criterion, curCriterionIndex) => {
              if (curIndex === index && curCriterionIndex === criterionIndex) {
                return {
                  question_id: criterion.question_id,
                  name: criterion.name,
                  grade:
                    criterion.grade > 60
                      ? criterion.grade - 5
                      : criterion.grade,
                };
              }

              return criterion;
            },
          ),
        });

        return newQuestions;
      }, []),
    );
  }, []);

  const handleIncreaseGrade = useCallback((index, criterionIndex) => {
    setQuestions(state =>
      state.reduce((newQuestions: QuestionFormat[], question, curIndex) => {
        newQuestions.push({
          section: question.section,
          criterions: question.criterions.map(
            (criterion, curCriterionIndex) => {
              if (curIndex === index && curCriterionIndex === criterionIndex) {
                return {
                  question_id: criterion.question_id,
                  name: criterion.name,
                  grade:
                    criterion.grade < 100
                      ? criterion.grade + 5
                      : criterion.grade,
                };
              }

              return criterion;
            },
          ),
        });

        return newQuestions;
      }, []),
    );
  }, []);

  const handleChangeGrade = useCallback((grade, index, criterionIndex) => {
    setQuestions(state =>
      state.reduce((newQuestions: QuestionFormat[], question, curIndex) => {
        newQuestions.push({
          section: question.section,
          criterions: question.criterions.map(
            (criterion, curCriterionIndex) => {
              if (curIndex === index && curCriterionIndex === criterionIndex) {
                return {
                  question_id: criterion.question_id,
                  name: criterion.name,
                  grade,
                };
              }

              return criterion;
            },
          ),
        });

        return newQuestions;
      }, []),
    );
  }, []);

  return (
    <>
      {loading && <Loading zIndex={1} />}

      <Background>
        <Main>
          <div>
            <FontAwesomeIcon
              size="2x"
              icon={faChevronLeft}
              onClick={() => {
                history.goBack();
              }}
            />

            <strong>AVALIAÇÃO</strong>
          </div>

          <section>
            {questions.map((question, index) => (
              <QuestionContainer key={`section:${index}`}>
                <strong>{`${String(index + 1)}. ${question.section}`}</strong>
                {question.criterions.map((criterion, criterionIndex) => (
                  <CriterionContainer
                    key={`criterion:${index}:${criterionIndex}`}
                  >
                    <strong>
                      {`${String(index + 1)}.${String(criterionIndex + 1)}. ${
                        criterion.name
                      }`}
                    </strong>
                    <ScoreContainer>
                      <button
                        type="button"
                        onClick={() =>
                          handleDecreaseGrade(index, criterionIndex)
                        }
                      >
                        -
                      </button>
                      <div>
                        <strong>{handleTransformGrade(criterion.grade)}</strong>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleIncreaseGrade(index, criterionIndex)
                        }
                      >
                        +
                      </button>
                    </ScoreContainer>

                    <SliderInput
                      index={index}
                      criterionIndex={criterionIndex}
                      value={criterion.grade}
                      setValue={handleChangeGrade}
                    />
                  </CriterionContainer>
                ))}
              </QuestionContainer>
            ))}

            <strong>Comentário</strong>

            <textarea
              value={comments}
              onChange={e => setComments(e.target.value)}
              placeholder="Opcional"
            />
          </section>

          {error && <strong>Erro ao concluir avaliação</strong>}

          <button type="button" onClick={handleSubmit}>
            Concluir
          </button>
        </Main>
      </Background>
    </>
  );
};

export default ProjectInfo;
