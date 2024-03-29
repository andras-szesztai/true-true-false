export const designTokens = {
    space: {
        '3xs': 2,
        xxs: 4,
        xs: 8,
        sm: 12,
        base: 16,
        md: 24,
        lg: 32,
        xl: 48,
        xxl: 64,
        '3xl': 96,
        '4xl': 128,
        '5xl': 192,
    },
    strokeWidth: {
        sm: 1,
        md: 2,
        lg: 4,
    },
    color: {
        black: '#000000',
        gray: '#A3A3A3',
        placeholder: '#757575',
        background: '#FDF2E4',
        accentOne: '#F6C15C',
        accentTwo: '#EE7A50',
        accentThree: '#F9DAA8',
    },
    shadows: {
        focus: `0 0 0 4px rgba(0, 0, 0, .25)`,
    },
    fontSize: {
        xs: '0.5rem',
        sm: '0.75rem',
        base: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem',
        xxl: '4rem',
    },
    breakPoints: {
        sm: 360,
        md: 720,
        lg: 1040,
    },
} as const
