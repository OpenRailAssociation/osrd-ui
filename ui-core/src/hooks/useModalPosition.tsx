import { useState, useEffect, useCallback } from 'react';

export const useModalPosition = (
  inputRef: React.RefObject<HTMLInputElement>,
  modalRef: React.RefObject<HTMLDivElement>,
  offset: number = 3, // Default offset below the input
  horizontalOffset: number = 0 // Default horizental offset to center the modal
) => {
  const [modalPosition, setModalPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  const calculatePosition = useCallback(() => {
    if (inputRef.current && modalRef.current) {
      const inputRect = inputRef.current.getBoundingClientRect();
      const modalRect = modalRef.current.getBoundingClientRect();

      // Center the modal horizontally relative to the input element
      let left = inputRect.left + inputRect.width / 2 - modalRect.width / 2;
      // Set the top position directly below the input element with a slight offset
      let top = inputRect.bottom + window.scrollY - offset; // Apply the offset below the input
      left = left - horizontalOffset; // Apply the offset below the input

      // Adjust if modal goes beyond viewport
      if (left + modalRect.width > window.innerWidth) {
        left = window.innerWidth - modalRect.width;
      } else if (left < 0) {
        left = 10; // Apply a slight padding
      }

      if (top + modalRect.height > window.innerHeight) {
        top = window.innerHeight - modalRect.height - horizontalOffset;
      }

      setModalPosition({ top, left });
    }
  }, [inputRef, modalRef, offset, horizontalOffset]);

  useEffect(() => {
    calculatePosition();
    // Recalculate position on window resize to handle dynamic content changes
    const handleResize = () => calculatePosition();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculatePosition]);

  return { modalPosition, calculatePosition };
};
