import styled from 'styled-components';

export const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 0;
  border-radius: 0.5rem;
  box-shadow: 1px 1px 5px 1px #777;
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
