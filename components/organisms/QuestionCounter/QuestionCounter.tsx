import { ButtonSizes } from 'components/atoms/Button'
import { AdminButton } from 'components/molecules/AdminButton'

import { Props } from './types'
import { Container, Number } from './styles'

const QuestionCounter = ({
    questionsLeft,
    playerRole,
    roomSlug,
    adminButtonIsEnabled,
}: Props) => {
    return (
        <Container>
            <div>
                <Number questionsLeft={questionsLeft}>{questionsLeft}</Number>{' '}
                Question{questionsLeft !== 1 ? 's' : ''} Left
            </div>
            {!!questionsLeft && (
                <AdminButton
                    role={playerRole}
                    slug={roomSlug}
                    apiRoute={`/decrease-questions-left/${questionsLeft}`}
                    isDisabled={!adminButtonIsEnabled}
                    text="Decrease"
                    size={ButtonSizes.sm}
                    noSuccessMessage
                />
            )}
        </Container>
    )
}

export default QuestionCounter
