import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
  position: absolute;

  min-width: 100vw;
  height: 100px;
  padding-right: 3rem;

  svg {
    color: var(--warm-gray);
    margin: 0 1rem 0 3rem;
  }

  button {
    background: none;
    border: 0;
    font-size: 28px;
    font-weight: 700;
    text-align: center;
    color: var(--warm-gray);
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#777')};
    }
  }

  strong {
    font-size: 28px;
    font-weight: 700;
    text-align: center;
    color: var(--warm-gray);
  }
`;
