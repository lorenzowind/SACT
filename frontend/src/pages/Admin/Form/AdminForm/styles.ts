import styled from 'styled-components';
import { shade } from 'polished';

import backgroundImg from '../../../../assets/background.png';

export const Background = styled.div`
  min-width: 100vw;
  height: 100vh;
  background-image: url(${backgroundImg});
  background-size: cover;
  padding-top: 60px;
  overflow-x: hidden;
`;

export const SecondaryHeader = styled.div`
  padding-top: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  a {
    padding-left: 80px;
    position: absolute;
    left: 0;

    svg {
      cursor: pointer;
      color: var(--warm-gray);
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#707070')};
      }
    }
  }

  strong {
    font-size: 48px;
    font-weight: 400;
    text-decoration: underline;
    color: var(--warm-gray);
  }
`;

export const Container = styled.div`
  height: 400px;
  padding-top: 60px;

  form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }

  @media only screen and (max-width: 1100px) {
    display: none;
  }
`;

export const InputsContainer = styled.div`
  height: 400px;
  display: flex;
  flex-direction: column;

  &:first-child {
    margin-right: 30px;
  }

  &:last-child {
    margin-left: 30px;
  }

  strong {
    font-size: 24px;
    font-weight: 400;
    color: var(--warm-gray);
  }

  div {
    margin: 10px 0 30px 0;
    height: 60px;
    width: 400px;

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input {
      font-size: 18px;
    }

    select {
      font-size: 18px;
    }
  }

  button {
    align-self: flex-end;
  }
`;
