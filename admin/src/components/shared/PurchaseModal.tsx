import React from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: React.ReactNode;
  classname?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = React.memo(
  React.forwardRef<HTMLDivElement, ModalProps>(
    ({ children, classname, isOpen, onClose }, ref) => {
      if (!isOpen) return null;

      return createPortal(
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-65 z-50"
            onClick={onClose}
          />
          <main
            ref={ref}
            className={`${classname} fixed top-1/2 left-1/2 z-[999] bg-white border outline-none rounded-lg`}
            style={{
              transform: 'translate(-50%, -50%)',
            }}
          >
            {children}
          </main>
        </>,
        document.body
      );
    }
  )
);
