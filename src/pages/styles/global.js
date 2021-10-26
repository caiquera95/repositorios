import {createGlobalStyle} from 'styled-components';

export default createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
}

html, body, #root {
    min-height: 100%;
}

body {
    background: #A4B0F5;
    font-size: 18px;
    -webkit-font-smoothing: antialiased !important;
}

body {
    color: #466995;
    font-size: 18px;
    font-family: Georama, Helvetica, sans-serif;
}

button {
    cursor: pointer;
}

`;