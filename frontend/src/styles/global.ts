import { createGlobalStyle } from 'styled-components';
import BackgroundImage from '../assets/images/BackgroundImage/BackgroundImage.png';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: url(${BackgroundImage}) no-repeat 50% cover;
    
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
