import { GetStatementForQuestionResponse } from 'types/apiResponses'

export interface Props {
    statements: GetStatementForQuestionResponse | undefined
    isLoading: boolean
    error: Error | undefined
}
