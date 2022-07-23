import { Container } from './styles'

const ChartCounter = ({ value }: { value: number }) => {
    return <Container value={value}>{value}</Container>
}

export default ChartCounter
