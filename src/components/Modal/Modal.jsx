import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay, ModalWindow, ModalImg } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal');

function Modal({ src, alt, onClick }) {
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClick();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget !== e.target) {
      onClick();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  });

  return createPortal(
    <ModalOverlay onClick={handleBackdropClick}>
      <ModalWindow>
        <ModalImg src={src} alt={alt} />
      </ModalWindow>
    </ModalOverlay>,
    modalRoot
  );
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Modal;
