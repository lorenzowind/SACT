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

      background: white;

      border-radius: 10px;
      box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.16);
      border: solid 0.5px var(--warm-gray);

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

      button {
        background: none;
        border: 0;
        margin-left: 16px;

        display: flex;
        align-items: center;
        justify-content: center;

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
      max-height: 90px;
      overflow-y: auto;
      width: 400px;
      margin-bottom: 10px;

      nav {
        margin: 0 10px 10px 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;

        h2 {
          font-size: 14px;
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
