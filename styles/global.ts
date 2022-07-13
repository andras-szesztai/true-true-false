import { css } from '@emotion/react'
import { designTokens } from './designTokens'

export const globalStyles = css`
    :root {
        font-family: 'Share Tech Mono', monospace;
        font-weight: 400;
        color: ${designTokens.color.black};
        font-style: normal;
    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    * {
        margin: 0;
    }

    html,
    body {
        height: 100%;
        background-color: ${designTokens.color.background};
    }

    body {
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
    }

    img,
    picture,
    video,
    canvas,
    svg {
        display: block;
        max-width: 100%;
    }

    input,
    button,
    textarea,
    select {
        font: inherit;
    }

    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        overflow-wrap: break-word;
    }

    #__next {
        height: 100%;
    }
`
