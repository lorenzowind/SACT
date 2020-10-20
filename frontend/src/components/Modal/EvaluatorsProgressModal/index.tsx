import React, { useEffect, useState } from 'react';
import { FiCheck } from 'react-icons/fi';

import { Container, CloseModal } from './styles';

import Modal from '..';
import Button from '../../Button';

import { Avaliation, Evaluator } from '../../../pages/Admin/Dashboard';

interface IModalProps {
  evaluators: Evaluator[];
  avaliations: Avaliation[];
  isOpen: boolean;
  setIsOpen: () => void;
}

interface EvaluatorAvaliations {
  name: string;
  rated: number;
  total: number;
}

const EvaluatorsProgressModal: React.FC<IModalProps> = ({
  evaluators,
  avaliations,
  isOpen,
  setIsOpen,
}) => {
  const [evaluatorAvaliations, setEvaluatorAvaliations] = useState<
    EvaluatorAvaliations[]
  >([]);

  useEffect(() => {
    const loadData = () => {
      const newEvaluatorAvaliations: EvaluatorAvaliations[] = [];

      evaluators.forEach(evaluator => {
        const auxEvaluatorAvaliations = avaliations.filter(
          avaliation => avaliation.evaluator_id === evaluator.id,
        );

        newEvaluatorAvaliations.push({
          name: evaluator.name,
          rated: auxEvaluatorAvaliations.filter(
            auxEvaluatorAvaliation => auxEvaluatorAvaliation.status === 'rated',
          ).length,
          total: auxEvaluatorAvaliations.length,
        });
      });

      setEvaluatorAvaliations(newEvaluatorAvaliations);
    };

    loadData();
  }, [evaluators, avaliations]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <CloseModal onClick={setIsOpen}>
        <strong>X</strong>
      </CloseModal>
      <Container>
        <strong>Andamento do avaliadores</strong>
        <div>
          <nav>
            {evaluatorAvaliations.map(evaluatorAvaliation => (
              <section>
                <strong>{evaluatorAvaliation.name}</strong>
                <article>
                  <strong>
                    {evaluatorAvaliation.rated}/{evaluatorAvaliation.total}
                  </strong>
                  {evaluatorAvaliation.rated === evaluatorAvaliation.total &&
                    evaluatorAvaliation.total !== 0 && <FiCheck />}
                </article>
              </section>
            ))}
          </nav>

          <Button type="button" onClick={setIsOpen}>
            Ok
          </Button>
        </div>
      </Container>
    </Modal>
  );
};

export default EvaluatorsProgressModal;
