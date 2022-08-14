import { ReactNode } from 'react'

export interface Props {
    isOpen: boolean
    handleClose: () => void
    children: ReactNode
}
