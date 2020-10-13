import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  padding: 12px 16px;
  width: 100%;

  display: flex;
  align-items: center;

  background: white;

  border-radius: 10px;
  box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.16);
  border: solid 0.5px var(--warm-gray);


  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: var(--warm-gray);
    `}

  ${props =>
    props.isFilled &&
    css`
      color: var(--warm-gray);
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    font-weight: 400;
  }

  svg {
    margin-right: 16px;
  }
`;
