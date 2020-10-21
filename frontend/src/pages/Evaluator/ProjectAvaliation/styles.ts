import styled from 'styled-components';
import { shade } from 'polished';

import backgroundImg from '../../../assets/background.png';

export const Background = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  background-image: url(${backgroundImg});
  background-repeat: no-repeat;
  background-size: cover;
`;

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

    > strong {
      font-size: 36px;
      font-weight: 700;
      color: var(--dark-gray);
      border-bottom: 2px solid var(--dark-gray);
    }

    svg {
      margin-left: -4rem;
      margin-right: 1rem;
      cursor: pointer;
      width: 4rem;
      height: 4rem;
      color: var(--dark-gray);
    }
  }

  & > * {
    line-height: 1.5;
  }

  section {
    display: flex;
    flex-direction: column;
    width: 75%;

    > strong {
      font-size: 28px;
      color: var(--dark-gray);
      margin: 1rem 0;
    }

    textarea {
      padding: 12px;
      width: 100%;
      height: 8rem;

      background: white;

      border-radius: 10px;
      box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.16);
      border: solid 0.5px var(--warm-gray);

      resize: none;
    }
  }

  footer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    > strong {
      width: 75%;
      top: 20px;
      position: absolute;
      font-size: 18px;
      font-weight: 700;
      color: #c53030;
    }

    > button {
      border-radius: 10px;
      box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.16);
      border: solid 1px var(--warm-gray);

      font-size: 1.5rem;
      background: var(--primary);
      color: white;
      height: 60px;
      width: 75%;
      margin: 60px 0 30px 0;
      font-size: 24px;
      font-weight: 700;
      transition: background-color 0.2s;

      &:hover {
        background: ${shade(0.2, '#0000fb')};
      }
    }
  }
`;

export const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;

  > strong {
    font-size: 28px;
    color: var(--dark-gray);
    margin-bottom: 2rem;
  }

  & + div {
    margin-top: 3rem;
  }
`;

export const CriterionContainer = styled.div`
  margin-left: 1rem;
  width: 100%;
  padding-right: 1rem;

  > strong {
    font-size: 24px;
    font-weight: 400;
    color: var(--dark-gray);
  }

  & + div {
    margin-top: 2rem;
  }
`;

export const ScoreContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 15px;
    border: solid 1px var(--warm-gray);
    background-color: white;
    width: 6rem;
    height: 4rem;
    margin: 0 1rem;

    strong {
      font-size: 24px;
      font-weight: 400;
    }
  }

  > button {
    border: 0;
    background: none;
    border-radius: 10px;
    background-color: var(--warm-gray);
    color: white;
    font-size: 24px;
    font-weight: 700;
    width: 3rem;
    height: 3rem;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${shade(0.2, '#707070')};
    }
  }
`;
