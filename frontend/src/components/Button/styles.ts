import styled from 'styled-components';
import { shade } from 'polished';

<<<<<<< HEAD
export const Main = styled.main`
  padding-top: 10vh;
  text-align: center;

  & > input[type='text'] {
    margin-top: 1rem;
    margin-bottom: 6rem;
=======
export const Container = styled.button`
  border-radius: 10px;
  box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px var(--warm-gray);

  font-size: 1.5rem;
  background: var(--primary);
  color: white;
  height: 60px;
  width: 50%;
  max-width: 250px;
  font-size: 24px;
  font-weight: 700;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#0000fb')};
>>>>>>> master-dev
  }
`;
