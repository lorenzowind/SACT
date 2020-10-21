import styled from 'styled-components';
import { shade } from 'polished';

import backgroundImg from '../../../assets/background.png';

export const Background = styled.div`
  min-width: 100vw;
  height: 100vh;
  background-image: url(${backgroundImg});
  background-size: cover;
  padding-top: 60px;
  overflow-x: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  @media only screen and (max-width: 1100px) {
    display: none;
  }

  > div {
    aside,
    > button {
      border-radius: 10px;
      box-shadow: 10px 10px 10px 0 rgba(0, 0, 0, 0.16);
      border: solid 0.5px var(--warm-gray);
      background-color: #f9f8f8;

      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

    > section {
      > button {
        border-radius: 10px;
        box-shadow: 10px 10px 10px 0 rgba(0, 0, 0, 0.16);
        border: solid 0.5px var(--warm-gray);
        background-color: #f9f8f8;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
    }
  }
`;

export const LeftContainer = styled.div`
  height: 600px;
  width: 300px;
  margin-right: 15px;

  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const RightContainer = styled.div`
  height: 600px;
  width: 800px;
  margin-left: 15px;

  display: flex;
  justify-content: center;
  flex-direction: column;

  > section {
    display: flex;
    justify-content: center;
    flex-direction: row;
    height: 40%;
    margin-top: 15px;
  }
`;

export const RankingContainer = styled.button`
  height: 60%;
  padding: 30px;
  margin-bottom: 15px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${shade(0.2, '#f9f8f8')};
  }

  img {
    margin-bottom: 15px;
    height: 180px;
    width: 180px;
  }

  strong {
    margin-top: 15px;
    font-size: 28px;
    font-weight: 700;
    text-align: center;
    color: var(--primary);
  }
`;

export const AvaliationsContainer = styled.button`
  height: 40%;
  padding: 30px;
  margin-top: 15px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${shade(0.2, '#f9f8f8')};
  }

  strong {
    margin-bottom: 10px;
    font-size: 36px;
    font-weight: 700;
    text-align: center;
    color: var(--warm-gray);

    b {
      margin-top: 15px;
      font-size: 48px;
      font-weight: 700;
      text-align: center;
      color: var(--primary);
    }
  }

  h2 {
    margin-top: 10px;
    font-size: 24px;
    font-weight: 400;
    text-align: center;
    color: var(--primary);
    white-space: nowrap;
  }
`;

export const ReportsContainer = styled.aside`
  height: 60%;
  margin-bottom: 15px;
  padding: 15px 30px;

  article {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: row;
    border-bottom: 1px solid var(--warm-gray);

    img {
      margin: 0 10px 10px 10px;
      height: 50px;
      width: 50px;
    }

    strong {
      margin: 0 20px 10px 10px;
      font-size: 28px;
      font-weight: 700;
      text-align: center;
      color: var(--primary);
    }
  }

  nav {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    margin: 30px 0 0 80px;
    width: 100%;

    section {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;

      button {
        background: none;
        border: 0;
        margin-right: 60px;

        svg {
          height: 40px;
          width: 40px;
          color: var(--primary);
          transition: color 0.2s;

          &:hover {
            color: ${shade(0.2, '#0000fb')};
          }
        }
      }

      strong {
        font-size: 20px;
        font-weight: 400;
        text-align: center;
        color: var(--light-gray);
      }

      & + section {
        margin-top: 30px;
      }
    }
  }
`;

export const EvaluatorsContainer = styled.button`
  width: 50%;
  margin-right: 15px;
  padding: 30px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${shade(0.2, '#f9f8f8')};
  }

  strong {
    margin-bottom: 10px;
    font-size: 36px;
    font-weight: 700;
    text-align: center;
    color: var(--warm-gray);

    b {
      margin-top: 15px;
      font-size: 48px;
      font-weight: 700;
      text-align: center;
      color: var(--primary);
    }
  }

  h2 {
    margin-top: 10px;
    font-size: 24px;
    font-weight: 400;
    text-align: center;
    color: var(--primary);
  }
`;

export const InfoContainer = styled.aside`
  width: 50%;
  margin-left: 15px;
  padding: 15px 5px;

  article {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    border-bottom: 1px solid var(--warm-gray);

    img {
      margin: 0 10px 0 10px;
      height: 50px;
      width: 50px;
    }

    strong {
      margin: 0 20px 0 10px;
      font-size: 28px;
      font-weight: 700;
      text-align: center;
      color: var(--primary);
    }
  }

  nav {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    margin: 15px 0 0 -30px;

    a {
      font-size: 20px;
      font-weight: 400;
      text-align: center;
      color: var(--light-gray);
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#777')};
      }

      & + a {
        margin-top: 10px;
      }
    }
  }
`;
