import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --primary: #0000fb;
    --primary-light: #4d4dff;
    --primary-dark: #0000db;
    --secondary: #00fc08;
    --secondary-light: #aeffb0;
    --secondary-dark: #00cf07;
    --background: #dfdfdf;
  }
  
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    font-size: 100%;
    line-height: 100%;
  }

  body {
    background: var(--background);
    color: var(--primary);
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }
`;
