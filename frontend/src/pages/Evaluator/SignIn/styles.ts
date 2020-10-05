import styled from 'styled-components';

import backgroundImg from '../../../assets/background.png';

export const Background = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  background-image: url(${backgroundImg});
  background-repeat: no-repeat;
  background-size: cover;
`;

export const Main = styled.main`
  padding-top: 10vh;
  text-align: center;

  & > input[type='text'] {
    margin-top: 1rem;
    margin-bottom: 6rem;
  }

  input {
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
  }
`;
