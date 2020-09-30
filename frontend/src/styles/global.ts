import { createGlobalStyle } from 'styled-components';
import BackgroundImage from '../assets/images/BackgroundImage/BackgroundImage.png';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  #root{
    background-image: url(${BackgroundImage});
    background-repeat: no-repeat;
    backgroun-size:cover;
    object-fit:contain;
    
  }

  body {
    max-width:1920px;
    max-height:1080px;
    height:100vh;
    width:100vw;
    
    -webkit-font-smoothing: antialiased;
    
  }

  body, input, button {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button,a {
    cursor: pointer;
  }
`;
