import styled from 'styled-components';
import { shade } from 'polished';

import backgroundImg from '../../../../assets/background.png';

export const Background = styled.div`
  min-width: 100vw;
  height: 100vh;
  background-image: url(${backgroundImg});
  background-size: cover;
  padding-top: 60px;
  overflow-y: hidden;
  overflow-x: hidden;
`;

export const SecondaryHeader = styled.div`
  position: absolute;
  padding-top: 80px;
  width: 100%;
  top: 0;

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
  height: 700px;
  padding-top: 120px;

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

export const LeftContainer = styled.div`
  margin-right: 30px;
  height: 700px;
  display: flex;
  flex-direction: column;

  strong {
    font-size: 24px;
    font-weight: 400;
    color: var(--warm-gray);
  }

  div {
    margin: 10px 0 30px 0;
    height: 60px;
    width: 400px;

    input {
      font-size: 18px;
    }

    select {
      font-size: 18px;
    }
  }
`;

export const RightContainer = styled.div`
  margin-left: 30px;
  height: 700px;
  display: flex;
  flex-direction: column;

  strong {
    font-size: 24px;
    font-weight: 400;
    color: var(--warm-gray);
  }

  div {
    margin-top: 10px;
    padding: 12px 16px;
    height: 60px;
    width: 400px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: white;

    border-radius: 10px;
    box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.16);
    border: solid 0.5px var(--warm-gray);

    input {
      flex: 1;
      background: transparent;
      border: 0;
      font-size: 18px;
      font-weight: 400;
    }

    button {
      background: none;
      border: 0;
      margin-left: 16px;

      svg {
        color: var(--primary);
        width: 28px;
        height: 28px;
        transition: color 0.2s;

        &:hover {
          color: ${shade(0.2, '#0000fb')};
        }
      }
    }
  }

  section {
    max-height: 150px;
    overflow-y: auto;
    width: 400px;
    margin-bottom: 30px;

    nav {
      margin: 20px 10px 20px 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: row;

      h2 {
        font-size: 18px;
        font-weight: 400;
        color: var(--dark-gray);
      }

      button {
        background: none;
        border: 0;
        color: #c53030;

        svg {
          width: 28px;
          height: 28px;
        }
      }
    }
  }

  textarea {
    margin: 10px 0;
    width: 400px;
    height: 180px;
    font-size: 18px;
  }

  button {
    align-self: flex-end;
  }
`;
