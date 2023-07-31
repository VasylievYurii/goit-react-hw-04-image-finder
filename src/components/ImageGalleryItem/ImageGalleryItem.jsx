import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import {
  ItemCardWrapper,
  ItemCard,
  ItemCardImg,
} from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ src, alt, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  return (
    <ItemCardWrapper>
      <ItemCard
        href="#"
        rel="noopener noreferrer nofollow"
        onClick={toggleModal}
      >
        <ItemCardImg src={src} alt={alt} />
        {showModal && (
          <Modal src={largeImageURL} alt={alt} onClick={toggleModal} />
        )}
      </ItemCard>
    </ItemCardWrapper>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  largeImageURL: PropTypes.string.isRequired,
};
