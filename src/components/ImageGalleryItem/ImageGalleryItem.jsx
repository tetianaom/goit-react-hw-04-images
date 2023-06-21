import { useState } from 'react';
import PropTypes from 'prop-types';
import { ModalWindow } from 'components/Modal/Modal';
import { ImageItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  image: { webformatURL, largeImageURL, tags },
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <ImageItem src={webformatURL} alt={tags} onClick={openModal} />
      {isModalOpen && (
        <ModalWindow
          isOpen={isModalOpen}
          largeImageURL={largeImageURL}
          tags={tags}
          onRequestClose={closeModal}
        />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
