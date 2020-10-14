import styled from 'styled-components';

import backgroundImg from '../../../assets/background.png';

export const Background = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  background-image: url(${backgroundImg});
  background-repeat: no-repeat;
  background-size: cover;
  padding-top: 6vh;
`;

export const Main = styled.main`
  form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    img {
      width: 100%;
      max-width: 800px;
    }

    section {
      display: flex;
      align-items: center;
      flex-direction: column;
      position: relative;

      margin-bottom: 6rem;
      max-width: 400px;
      width: 80%;

      div {
        height: 60px;
        margin-bottom: 1rem;

        input {
          font-size: 18px;
          font-weight: 400;
        }
      }

      button {
        background: none;
        border: 0;
        align-self: flex-end;
        font-size: 18px;
        font-weight: 400;
        color: var(--dark-gray);
      }
    }
  }
`;
