import { ChangeEvent } from 'react'

export interface Props {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    placeholder: string
    maxLength?: number
    error?: string
}
