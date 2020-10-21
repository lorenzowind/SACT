import styled, { css } from 'styled-components';
import { shade } from 'polished';

import backgroundImg from '../../../assets/background.png';

interface FilterContainerProps {
  selectedIndex: number;
}

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
  padding-left: 80px;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  svg {
    cursor: pointer;
    color: var(--warm-gray);
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#707070')};
    }
  }

  strong {
    margin-left: 80px;
    font-size: 48px;
    font-weight: 700;
    text-align: center;
    color: var(--primary);
  }
`;

export const Container = styled.div`
  height: 700px;
  display: flex;
  padding-top: 40px;
  padding-left: 190px;
  flex-direction: column;

  form {
    strong {
      font-size: 36px;
      font-weight: 400;
      color: var(--primary);
    }

    div {
      margin-top: 20px;
      padding: 12px 16px;
      height: 60px;
      width: 500px;

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
  }

  > div {
    display: flex;
    align-items: center;
    margin-top: 20px;

    strong {
      font-size: 36px;
      font-weight: 400;
      color: var(--primary);
    }

    button {
      background: none;
      border: 0;
      margin-left: 20px;

      svg {
        color: var(--warm-gray);
        width: 58px;
        height: 58px;
        transition: color 0.2s;

        &:hover {
          color: ${shade(0.2, '#707070')};
        }
      }
    }

    > svg {
      margin-left: 20px;
      color: var(--warm-gray);
      width: 42px;
      height: 42px;
    }
  }

  @media only screen and (max-width: 1100px) {
    display: none;
  }
`;

export const TableContainer = styled.table`
  margin-top: 20px;
  height: 350px;
  width: 1000px;

  background: white;

  border-radius: 10px;
  box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.16);
  border: solid 0.5px var(--warm-gray);

  overflow-y: auto;
  display: flex;
  align-items: center;
  flex-direction: column;

  thead {
    border-bottom: 1px solid var(--warm-gray);
  }

  tbody {
    margin-bottom: 10px;

    tr {
      transition: background-color 0.2s;

      &:hover {
        background: ${shade(0.2, '#fff')};
      }
    }
  }

  th {
    font-size: 20px;
    padding: 20px 5px;
    max-width: 260px;
    min-width: 260px;

    &:nth-child(2) {
      max-width: 160px;
      min-width: 160px;
    }

    &:nth-child(3) {
      max-width: 400px;
      min-width: 400px;
    }

    &:nth-child(4) {
      max-width: 80px;
      min-width: 80px;
    }

    &:last-child {
      max-width: 60px;
      min-width: 60px;
    }
  }

  td {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-align: center;

    font-size: 20px;
    padding: 10px 5px;
    max-width: 260px;
    min-width: 260px;

    &:nth-child(2) {
      max-width: 160px;
      min-width: 160px;
    }

    &:nth-child(3) {
      max-width: 400px;
      min-width: 400px;
    }

    &:nth-child(4) {
      max-width: 80px;
      min-width: 80px;
    }

    &:last-child {
      max-width: 60px;
      min-width: 60px;

      button {
        background: none;
        border: 0;

        svg {
          color: var(--primary);
          width: 25px;
          height: 25px;
          transition: color 0.2s;

          &:hover {
            color: ${shade(0.2, '#0000fb')};
          }
        }
      }
    }
  }
`;

export const FilterContainer = styled.nav<FilterContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: 30px;

  button {
    background: none;
    border: 0;
    font-size: 20px;
    font-weight: 700;
    color: rgba(70, 70, 70, 0.5);
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#707070')};
    }

    ${props => {
      return css`
        &:nth-child(${props.selectedIndex}) {
          cursor: auto;
          color: ${shade(0.2, '#707070')};
        }
      `;
    }}
  }
`;
