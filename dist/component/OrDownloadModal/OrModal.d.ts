import React from 'react';
import './OrModal.scss';
interface ModalProps {
    title?: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}
declare const Modal: React.FC<ModalProps>;
export default Modal;
