import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, Modal } from './Modal.styled';

export default function ModalWindow({ largePicture, closeModal }) {
  useEffect(() => {
    const handleEscKeydown = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleEscKeydown);

    return () => {
      window.removeEventListener('keydown', handleEscKeydown);
    };
  }, [closeModal]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return (
    <Overlay className="overlay" onClick={handleBackdropClick}>
      <Modal className="modal">
        <img src={largePicture} alt="" />
      </Modal>
    </Overlay>
  );
}

ModalWindow.propTypes = {
  largePicture: PropTypes.string.isRequired,
};
