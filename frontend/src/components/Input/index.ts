import styled from 'styled-components';

export const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 0;
  border-radius: 0.5rem;
  box-shadow: 5px 5px 3px 0 var(--light-gray);
  &[type='button'] {
    cursor: pointer;
    font-size: 1.5rem;
    background: var(--primary);
    color: white;
    &:hover {
      background: var(--primary-dark);
    }
  }
`;
