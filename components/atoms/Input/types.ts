import { ChangeEvent } from 'react'

export interface Props {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    placeholder: string
    maxLength?: number
}
