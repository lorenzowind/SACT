import styled from 'styled-components';
import { shade } from 'polished';

import backgroundImg from '../../../assets/background.png';

export const Background = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  background-image: url(${backgroundImg});
  background-repeat: no-repeat;
  background-size: cover;
  overflow-y: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Main = styled.main`
  form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    img {
      margin-top: -100px;
      width: 100%;
      max-width: 500px;
    }

    section {
      display: flex;
      align-items: center;
      flex-direction: column;
      position: relative;

      width: 100%;
      margin-top: 2rem;
      margin-bottom: 6rem;
      max-width: 300px;
      width: 80%;

      div {
        height: 60px;

        input {
          font-size: 18px;
          font-weight: 400;
        }
      }

      strong {
        top: -30px;
        left: 0;
        position: absolute;
        font-size: 18px;
        font-weight: 700;
        color: #c53030;
      }
    }

    button {
      border-radius: 10px;
      box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.16);
      border: solid 1px var(--warm-gray);

      font-size: 1.5rem;
      background: var(--primary);
      color: white;
      height: 60px;
      width: 50%;
      max-width: 175px;
      font-size: 24px;
      font-weight: 700;
      transition: background-color 0.2s;

      &:hover {
        background: ${shade(0.2, '#0000fb')};
      }
    }
  }
`;
