import styled from 'styled-components';
import { shade } from 'polished';

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > div:first-child {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 12rem;
    margin-bottom: -2rem;

    > img {
      height: 9rem;
    }

    svg {
      cursor: pointer;
      margin-top: -10px;
      margin-right: -10px;
      width: 4rem;
      height: 4rem;
      color: var(--dark-gray);
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

  button {
    border-radius: 10px;
    box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.16);
    border: solid 1px var(--warm-gray);

    font-size: 1.5rem;
    background: var(--primary);
    color: white;
    height: 60px;
    width: 75%;
    margin: 30px 0;
    font-size: 24px;
    font-weight: 700;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#0000fb')};
    }
  }
`;
