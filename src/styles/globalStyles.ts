import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import { widthMedia, theme } from "./theme";

export const GlobalStyle = createGlobalStyle`
    *,
    *::before,
    *::after{
        margin: 0;
        padding: 0;
        box-sizing: border-box;   
        -webkit-tap-highlight-color:rgba(255,255,255,0);
        /* user-select: none; */
        -webkit-touch-callout: none;
        /* Keyword values */
        -webkit-touch-callout: default;
        -webkit-touch-callout: none;

        /* Global values */
        -webkit-touch-callout: initial;
        -webkit-touch-callout: inherit;
        -webkit-touch-callout: unset;
    }
    a{
        color: inherit;
        text-decoration: none;
    }

    ${reset}
    :focus {
        outline: none;
        border: none;
    }
    ::-webkit-scrollbar {
        display: none;
    }
    html{
        font-size: 11px;
        -webkit-text-size-adjust: none;
        font-family:'LINESeedKR-Rg', sans-serif;
        font-display: fallback;
        ${widthMedia.tablet}{
            font-size: 10px;
        }
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    @font-face {
        font-family: "LINESeedKRThin";
        font-weight: 300;
        src: url("/fonts/LINESeedKR-Th.otf") format("truetype");
    }
    @font-face {
        font-family: "LINESeedKRRegular";
        font-weight: 500;
        src: url("/fonts/LINESeedKR-Rg.otf") format("truetype");
    }
    @font-face {
        font-family: "LINESeedKRBold";
        font-weight: 700;
        src: url("/fonts/LINESeedKR-Bd.otf") format("truetype");
    }

`;
