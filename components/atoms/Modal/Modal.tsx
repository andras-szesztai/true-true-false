import { useRef } from 'react'
import { useClickAway } from 'react-use'

import { ModalContainer } from './styles'
import { Props } from './types'

const Modal = ({ children, isOpen, handleClose }: Props) => {
    const modalRef = useRef<HTMLDivElement>(null)
    useClickAway(modalRef, handleClose)
    if (!isOpen) return null
    return <ModalContainer ref={modalRef}>{children}</ModalContainer>
}

export default Modal
