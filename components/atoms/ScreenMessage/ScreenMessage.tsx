import { Message, Container, MessageContainer } from './styles'

const ScreenMessage = ({ text }: { text: string }) => (
    <Container>
        <MessageContainer>
            <Message>{text}</Message>
        </MessageContainer>
    </Container>
)

export default ScreenMessage
