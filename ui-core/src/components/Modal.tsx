import React, { useEffect, useRef } from 'react';

import { useModalPosition } from '../hooks/useModalPosition';
import useOutsideClick from '../hooks/useOutsideClick';

type ModalProps = {
  inputRef: React.RefObject<HTMLInputElement>;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const InputModal: React.FC<ModalProps> = ({ inputRef, isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { modalPosition, calculatePosition } = useModalPosition(inputRef, modalRef);

  useEffect(() => {
    if (isOpen) {
      calculatePosition();
    }
  }, [calculatePosition, isOpen]);

  useOutsideClick(modalRef, onClose);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div
        ref={modalRef}
        className="modal-content"
        style={{ top: modalPosition.top, left: modalPosition.left }}
      >
        {children}
      </div>
    </div>
  );
};

export default InputModal;
