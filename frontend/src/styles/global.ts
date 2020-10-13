import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --primary: #0000fb;
    --primary-light: #4d4dff;
    --primary-dark: #0000db;
    --primary-glow: #36bfd5;
    --secondary: #00fc08;
    --secondary-light: #5eff63;
    --secondary-dark: #00cf07;
    --secondary-glow: #aeffb0;
    --background: white;
    --light-gray: #777;
    --dark-gray: #676060;
    --warm-gray: #707070;
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
    color: var(--dark-gray);
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }
`;
