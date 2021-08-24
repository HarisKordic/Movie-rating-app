import { createGlobalStyle } from "styled-components"; //Importing method createGlobalStyle;

export const GlobalStyle = createGlobalStyle`
/*Write css code here:*/
:root{
    --maxWidth: 1280px;/*You create variables with -- */
    --white: #fff;
    --lightGrey: #eee;
    --medGrey: #353535;
    --darkGrey: #1c1c1c;
    --fontSuperBig: 2.5rem;
    --fontBig: 1.5rem;
    --fontMed: 1.2rem;
    --fontSmall: 1rem;
}

*{
    box-sizing:border-box;
    font-family:Abel,san-serif;
}
body{
    margin:0;
    padding:0;
    h1{/*SCSS can nest tags*/
        font-size:2rem;
        font-weight:600;
        color:var(--white);/*You call variables with var(--varName)*/
    }
    h3{
        font-size:1.1rem;
        font-weight:600;
    }
    p{
        font-size:1rem;
        color:var(--white);

    }
}
`;
