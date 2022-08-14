import { useToggle } from 'react-use'

import { Button, ButtonSizes } from 'components/atoms/Button'
import { Modal } from 'components/atoms/Modal'

import { Container } from './styles'
import { RULES_PARAGRAPHS } from './constants'

const RulesModal = () => {
    const [isOpen, toggleIsOpen] = useToggle(false)
    return (
        <>
            <Container>
                <Button
                    size={ButtonSizes.sm}
                    text="How to Play?"
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
