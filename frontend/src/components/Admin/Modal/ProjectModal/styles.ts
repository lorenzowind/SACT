import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > strong {
    padding: 30px;
    font-size: 24px;
    width: 100%;
    text-align: center;
    font-weight: 700;
    color: var(--primary);
    border-bottom: 1px solid var(--primary);
  }

  form {
    padding: 30px 60px;
    display: flex;
    flex-direction: column;

    strong {
      font-size: 18px;
      font-weight: 400;
      color: var(--warm-gray);
    }

    div {
      margin: 10px 0 15px 0;
      padding: 12px 16px;
      height: 40px;
      width: 400px;

      display: flex;
      align-items: center;
      justify-content: center;

      input {
        flex: 1;
        background: transparent;
        border: 0;
        font-size: 14px;
        font-weight: 400;
      }

      select {
        font-size: 14px;
      }
    }

    textarea {
      margin: 10px 0;
      width: 400px;
      height: 80px;
      font-size: 14px;
    }

    > nav {
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: row;

      button {
        &:first-child {
          background: none;
          border: 0;
        }

        svg {
          color: var(--primary);
          width: 42px;
          height: 42px;
          transition: color 0.2s;

          &:hover {
            color: ${shade(0.2, '#0000fb')};
          }
        }
      }
    }
  }
`;

export const CloseModal = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 16px;

  strong {
    cursor: pointer;
    font-size: 32px;
    font-weight: 700;
    color: var(--primary-dark);
  }
`;
