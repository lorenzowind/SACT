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
  min_grade: number;
  max_grade: number;
}

interface QuestionFormat {
  section: string;
  criterions: {
    name: string;
    question_id: string;
    min_grade: number;
    max_grade: number;
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
                  min_grade: question.min_grade * 10,
                  max_grade: question.max_grade * 10,
                  grade: question.min_grade * 10,
                });
              } else {
                newQuestions.push({
                  section: question.section,
                  criterions: [
                    {
                      name: question.criterion,
                      question_id: question.id,
                      min_grade: question.min_grade * 10,
                      max_grade: question.max_grade * 10,
                      grade: question.min_grade * 10,
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
    const leftPart = String(grade).substring(0, String(grade).length - 1);
    const rightPart = String(grade).substring(
      String(grade).length - 1,
      String(grade).length,
    );

    if (leftPart) {
      return `${leftPart}.${rightPart}`;
    }

    return rightPart;
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
                  min_grade: criterion.min_grade,
                  max_grade: criterion.max_grade,
                  grade:
                    criterion.grade > criterion.min_grade
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
                  min_grade: criterion.min_grade,
                  max_grade: criterion.max_grade,
                  grade:
                    criterion.grade < criterion.max_grade
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
                  min_grade: criterion.min_grade,
                  max_grade: criterion.max_grade,
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
                      min_grade={criterion.min_grade}
                      max_grade={criterion.max_grade}
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

          <footer>
            {error && <strong>*Erro ao concluir avaliação</strong>}

            <button type="button" onClick={handleSubmit}>
              Concluir
            </button>
          </footer>
        </Main>
      </Background>
    </>
  );
};

export default ProjectInfo;
