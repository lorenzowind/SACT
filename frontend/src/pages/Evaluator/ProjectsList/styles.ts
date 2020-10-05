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
  padding: 2rem;
  padding-left: 1rem;
  padding-bottom: 1rem;

  > button {
    background: none;
    border: 0;
  }

  > div:first-child {
    margin-top: 0;
  }

  > div {
    margin-top: 2rem;
  }
`;

export const BasicCard = styled.div`
  padding: 1rem;
  border: 1px solid var(--light-gray);
  border-radius: 1rem;
  background: white;
  color: var(--dark-gray);
  box-shadow: 5px 5px 3px 0 var(--light-gray);
`;

interface TitleCardProps {
  done?: boolean;
}

export const TitleCard = styled(BasicCard)`
  ${({ done }: TitleCardProps) => {
    if (done)
      return `
      background: linear-gradient(
        90deg,
        var(--secondary) 35%,
        var(--secondary-glow) 100%
      );`;
    return `
      background: linear-gradient(
        90deg,
        var(--primary) 35%,
        var(--primary-glow) 100%
      );`;
  }}
  color: white;
  font-size: 2rem;
  font-weight: bold;
`;

export const CardContainer = styled.div`
  /* container */
  cursor: pointer;

  & > div:nth-of-type(1) {
    padding-left: 1rem;
    padding-top: 1rem;
    > div:nth-of-type(1) {
      padding-top: 0.5rem;
      > p {
        text-align: left;
        line-height: 2;
      }
      /* first div */
      > div:nth-of-type(1) {
        display: flex;
        flex-flow: row nowrap;
        margin-bottom: 1rem;
        /* title */
        > div:nth-of-type(1) {
          margin-right: 1rem;
          margin-left: -2rem;
          margin-top: -2rem;
          flex: 3;
          :before {
            content: '';
            display: inline-block;
            vertical-align: middle;
            height: 100%;
          }
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        /* info */
        div:nth-of-type(2) {
          flex: 2;
          text-align: center;
          h1 {
            font-size: 2rem;
            font-weight: bold;
          }
        }
      }
    }
  }
`;
