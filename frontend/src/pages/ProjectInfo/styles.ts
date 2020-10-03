import styled from 'styled-components';

export const Main = styled.main`
  padding: 0 1rem;
  padding-bottom: 1rem;
  text-align: center;
  > div:first-child {
    display: inline-flex;
    align-items: center;
    max-width: 400px;
    > img {
      max-width: 85%;
    }
    > svg:first-child {
      color: var(--dark-gray);
    }
    > svg:last-child {
      color: var(--secondary);
    }
    > svg {
      flex: 1;
      height: auto;
    }
  }
  & > * {
    line-height: 1.5;
  }
  & > h1 {
    font-size: 3rem;
  }
  & > h2 {
    margin-top: 0.5rem;
    font-size: 2rem;
  }
  & > p {
    font-size: 1rem;
  }
`;
