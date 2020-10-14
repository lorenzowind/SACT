import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CloseModal = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 16px;

  strong {
    cursor: pointer;
    font-size: 32px;
    font-weight: 700;
    color: var(--primary-dark);
  }
`;
