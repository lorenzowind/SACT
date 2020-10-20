import React, { useEffect, useState } from 'react';
import { FiCheck } from 'react-icons/fi';

import { Container, CloseModal } from './styles';

import Modal from '..';
import Button from '../../Button';

import { Avaliation } from '../../../pages/Admin/Dashboard';

interface IModalProps {
  avaliations: Avaliation[];
  isOpen: boolean;
  setIsOpen: () => void;
}

interface ProjectAvaliations {
  name: string;
  rated: number;
  total: number;
}

const AvaliationsProgressModal: React.FC<IModalProps> = ({
  avaliations,
  isOpen,
  setIsOpen,
}) => {
  const [projectAvaliations, setProjectAvaliations] = useState<
    ProjectAvaliations[]
  >([]);

  useEffect(() => {
    const loadData = () => {
      const newProjectAvaliations: ProjectAvaliations[] = [];

      avaliations.forEach(avaliation => {
        const auxProjectAvaliation = newProjectAvaliations.find(
          newProjectAvaliation =>
            newProjectAvaliation.name === avaliation.project.name,
        );

        if (auxProjectAvaliation) {
          if (avaliation.status === 'rated') {
            auxProjectAvaliation.rated += 1;
          }

          auxProjectAvaliation.total += 1;
        } else {
          newProjectAvaliations.push({
            name: avaliation.project.name,
            rated: avaliation.status === 'rated' ? 1 : 0,
            total: 1,
          });
        }
      });

      setProjectAvaliations(newProjectAvaliations);
    };

    loadData();
  }, [avaliations]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <CloseModal onClick={setIsOpen}>
        <strong>X</strong>
      </CloseModal>
      <Container>
        <strong>Andamento dos projetos</strong>
        <div>
          <nav>
            {projectAvaliations.map(projectAvaliation => (
              <section>
                <strong>{projectAvaliation.name}</strong>
                <article>
                  <strong>
                    {projectAvaliation.rated}/{projectAvaliation.total}
                  </strong>
                  {projectAvaliation.rated === projectAvaliation.total &&
                    projectAvaliation.total !== 0 && <FiCheck />}
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

export default AvaliationsProgressModal;
