import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FiActivity } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '../../../services/api';

import Modal from '..';
import Loading from '../../Loading';

import { Container, CloseModal } from './styles';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

const EvaluatorModal: React.FC<IModalProps> = ({ isOpen, setIsOpen }) => {
  const formRef = useRef<FormHandles>(null);

  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading && <Loading zIndex={1} />}

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <CloseModal onClick={setIsOpen}>
          <strong>X</strong>
        </CloseModal>
        <Container />
      </Modal>
    </>
  );
};

export default EvaluatorModal;
