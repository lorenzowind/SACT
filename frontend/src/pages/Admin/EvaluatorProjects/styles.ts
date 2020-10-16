import styled, { css } from 'styled-components';
import { shade } from 'polished';

import backgroundImg from '../../../assets/background.png';

interface FilterContainerProps {
  selectedIndex: number;
}

interface SelectedProjectContainer {
  isSelected: boolean;
  isLeftPositionated: boolean;
  isRightPositionated: boolean;
}

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
  display: flex;
  padding-top: 100px;
  align-items: center;
  flex-direction: column;

  > section {
    display: flex;
    flex-direction: column;

    strong {
      font-size: 24px;
      font-weight: 400;
      color: var(--primary);

      b {
        color: var(--warm-gray);
      }
    }

    div {
      margin-top: 20px;
      padding: 12px 16px;
      height: 60px;
      width: 1000px;

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

  > nav {
    width: 1000px;
    display: flex;
    align-items: center;
    flex-direction: row;
    margin: 30px 0;

    button {
      background: none;
      border: 0;

      & + button {
        margin-left: 20px;
      }
    }

    svg {
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

export const FilterContainer = styled.nav<FilterContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

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

export const SelectedProjectsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow-y: auto;
  align-content: flex-start;

  width: 1000px;
  height: 200px;
  margin-bottom: 20px;
`;

export const SelectedProjectContainer = styled.div<SelectedProjectContainer>`
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;
  box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.16);
  border: solid 0.5px var(--warm-gray);
  background: ${props => (props.isSelected ? shade(0.2, '#fff') : '#fff')};

  width: 190px;
  height: 50px;
  margin: 0 5px 10px 5px;
  cursor: pointer;
  transition: background-color 0.2s;

  ${props =>
    props.isLeftPositionated &&
    css`
      margin: 0 5px 10px 0;
    `}

  ${props =>
    props.isRightPositionated &&
    css`
      margin: 0 0 10px 5px;
    `}

  strong {
    font-size: 18px;
    font-weight: 400;
    color: var(--warm-gray);
  }

  &:hover {
    background: ${shade(0.2, '#fff')};
  }
`;
