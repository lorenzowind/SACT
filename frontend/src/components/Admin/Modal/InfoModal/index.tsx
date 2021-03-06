import React from 'react';

import Modal from '..';
import Button from '../../../Button';

import { Container, CloseModal } from './styles';

interface IModalProps {
  text: string;
  isOpen: boolean;
  setIsOpen: () => void;
}

const InfoModal: React.FC<IModalProps> = ({ text, isOpen, setIsOpen }) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <CloseModal onClick={setIsOpen}>
        <strong>X</strong>
      </CloseModal>
      <Container>
        <div>
          <strong>{text}</strong>

          <Button type="button" onClick={setIsOpen}>
            Ok
          </Button>
        </div>
      </Container>
    </Modal>
  );
};

export default InfoModal;
