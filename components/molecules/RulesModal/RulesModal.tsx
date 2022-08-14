import { useToggle, useWindowSize } from 'react-use'

import { Button, ButtonSizes } from 'components/atoms/Button'
import { Modal } from 'components/atoms/Modal'
import { designTokens } from 'styles/designTokens'

import { Container } from './styles'
import { RULES_PARAGRAPHS } from './constants'

const RulesModal = () => {
    const { width } = useWindowSize()
    const [isOpen, toggleIsOpen] = useToggle(false)

    const isMobileSize = width <= designTokens.breakPoints.md
    return (
        <>
            <Container isFixed={!isMobileSize}>
                <Button
                    size={ButtonSizes.sm}
                    text="Rules"
                    onClick={toggleIsOpen}
                    isDisabled={isOpen}
                />
            </Container>
            <Modal
                isOpen={isOpen}
                handleClose={() => {
                    toggleIsOpen(false)
                }}
            >
                {RULES_PARAGRAPHS.map(({ key, text }) => (
                    <p key={key}>{text}</p>
                ))}
            </Modal>
        </>
    )
}

export default RulesModal
