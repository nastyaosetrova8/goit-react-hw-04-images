import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyledModal, StyledOverlay } from './Modal.styled';


export default function Modal({ onCloseModal, modalData }) {
  const handleClickOverlay = e => {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCloseModal]);


  return (
    <StyledOverlay onClick={handleClickOverlay}>
      <StyledModal>
        <img src={modalData.largeImageURL} alt={modalData.tags} />
      </StyledModal>
    </StyledOverlay>
  );
}


Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  modalData: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
  }).isRequired,
};
