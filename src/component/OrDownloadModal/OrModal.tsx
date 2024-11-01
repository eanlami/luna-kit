// Modal.tsx
import React from 'react';
import './OrModal.scss';
import LButton from '../Button/LButton';

interface ModalProps {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode; 
}

const Modal: React.FC<ModalProps> = ({ 
  title,
  isOpen,
  onClose,
  children 

}) => {
  if (!isOpen) return null; 

  return (
    <div className="modal-overlay" onClick={onClose}>

      <div className='modal-body' onClick={(e) => e.stopPropagation()}>
        <div className='t1-strong modal-title'>
          <span>
            {title}
          </span>

          <LButton
          layout='icon'
          appearance='outline'
          variant='secondary'
          size='md'
          
          onClick={onClose}
          />

        
        </div>
        <div className="modal-content">
        {children} 
        </div>


        



      </div>
    </div>
  );
};

export default Modal;
