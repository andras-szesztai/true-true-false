import { ButtonSizes } from 'components/atoms/Button'
import { AdminButton } from 'components/molecules/AdminButton'

import { Props } from './types'
import { Container, Number } from './styles'

const QuestionCounter = ({
    questionsLeft,
    playerRole,
    roomSlug,
    adminButtonIsEnabled,
}: Props) => (
    <Container>
        <div>
            <Number questionsLeft={questionsLeft}>{questionsLeft}</Number>{' '}
            Question{questionsLeft !== 1 ? 's' : ''} Left
        </div>
        {!!questionsLeft && adminButtonIsEnabled && (
            <AdminButton
                role={playerRole}
                slug={roomSlug}
                apiRoute={`/decrease-questions-left/${questionsLeft}`}
                text="Decrease"
                size={ButtonSizes.sm}
                noSuccessMessage
            />
        )}
    </Container>
)

export default QuestionCounter
