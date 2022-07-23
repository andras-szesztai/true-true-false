import styled from '@emotion/styled'
import { designTokens } from 'styles/designTokens'

const { fontSize, space, color } = designTokens

export const Container = styled.span<{ value: number }>`
    font-size: ${fontSize.base};
    position: absolute;
    right: ${space.xxs}px;
    bottom: ${space['3xs']}px;
    color: ${({ value }) => (value === 0 ? color.accentTwo : color.black)};
`
