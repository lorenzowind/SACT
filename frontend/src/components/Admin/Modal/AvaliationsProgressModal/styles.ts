import styled from 'styled-components';

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

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 30px 0;
    width: 100%;

    nav {
      max-height: 400px;
      overflow-y: auto;
      padding: 0 10px;
      margin-bottom: 10px;

      section {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 400px;
        margin-bottom: 2rem;

        > strong {
          font-size: 24px;
          font-weight: 700;
          color: var(--dark-gray);
        }

        article {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;

          strong {
            font-size: 24px;
            font-weight: 400;
            color: var(--dark-gray);
          }

          svg {
            width: 28px;
            height: 28px;
            margin-left: 1rem;
            color: var(--secondary-dark);
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
