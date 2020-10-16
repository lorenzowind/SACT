import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.textarea<ContainerProps>`
  padding: 12px 16px;
  width: 100%;

  background: white;

  border-radius: 10px;
  box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.16);
  border: solid 0.5px var(--warm-gray);

  resize: none;

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
`;
