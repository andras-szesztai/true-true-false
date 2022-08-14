import { Button, ButtonSizes } from 'components/atoms/Button'
import { useRef } from 'react'
import { useClickAway, useToggle, useWindowSize } from 'react-use'
import { designTokens } from 'styles/designTokens'

import { Container, ModalContainer } from './styles'

const RulesModal = () => {
    const { width } = useWindowSize()
    const [isOpen, toggleIsOpen] = useToggle(false)
    const modalRef = useRef<HTMLDivElement>(null)
    useClickAway(modalRef, toggleIsOpen)

    const isMobileSize = width <= designTokens.breakPoints.md

    return (
        <>
            <Container isFixed={!isMobileSize}>
                <Button
                    size={ButtonSizes.sm}
                    text="Rules"
                    onClick={toggleIsOpen}
                />
            </Container>
            {isOpen && <ModalContainer ref={modalRef}>Hello</ModalContainer>}
        </>
    )
}

export default RulesModal
