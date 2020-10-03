import styled from 'styled-components';
import paperTextureImg from '../../assets/img/paperTexture.png';

export const PaperBackground = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  background-image: url(${paperTextureImg});
  background-repeat: no-repeat;
  background-size: cover;
`;
