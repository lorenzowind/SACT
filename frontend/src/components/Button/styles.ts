import styled from 'styled-components';

export const Container = styled.button`
  border-radius: 10px;
  box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px var(--warm-gray);

  font-size: 1.5rem;
  background: var(--primary);
  color: white;
  height: 60px;
  width: 50%;
  max-width: 250px;
  font-size: 24px;
  font-weight: 700;

  &:hover {
    background: var(--primary-dark);
  }
`;
