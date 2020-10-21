import React, { useCallback } from 'react';

import { useEvaluatorAuth } from '../../../../hooks/evaluatorAuth';

import { Container, CloseModal } from './styles';

import Button from '../../../Button';
import Modal from '..';

interface IModalProps {
  text: string;
  isOpen: boolean;
  setIsOpen: () => void;
}

const InfoModal: React.FC<IModalProps> = ({ text, isOpen, setIsOpen }) => {
  const { signOut } = useEvaluatorAuth();

  const handleCloseModal = useCallback(() => {
    setIsOpen();
    signOut();
  }, [setIsOpen, signOut]);

  return (
    <Modal isOpen={isOpen} setIsOpen={handleCloseModal}>
      <CloseModal onClick={handleCloseModal}>
        <strong>X</strong>
      </CloseModal>
      <Container>
        <div>
          <strong>{text}</strong>

          <Button type="button" onClick={handleCloseModal}>
            Ok
          </Button>
        </div>
      </Container>
    </Modal>
  );
};

export default InfoModal;
