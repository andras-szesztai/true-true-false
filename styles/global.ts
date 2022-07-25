import { css } from '@emotion/react'
import { designTokens } from './designTokens'

const { color, space } = designTokens

export const globalStyles = css`
    :root {
        font-family: 'Share Tech Mono', monospace;
        font-weight: 400;
        color: ${color.black};
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
        height: 100vh;
        background-color: ${color.background};

        html {
            scrollbar-color: ${color.black} ${color.background};
        }
        &::-webkit-scrollbar {
            width: ${space.xs}px;
        }
        &::-webkit-scrollbar-thumb {
            background: ${color.black};
            border-radius: ${space.xs}px;
        }
        &::-webkit-scrollbar-track {
            background: ${color.background};
        }
    }

    body {
        line-height: 1.125;
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
        font-weight: 400;
    }

    &::selection {
        background: ${color.accentTwo};
    }

    #__next {
        position: relative;
        height: 100%;
        display: grid;
    }
`
