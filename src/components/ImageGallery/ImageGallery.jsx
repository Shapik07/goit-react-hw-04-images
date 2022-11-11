import PropTypes from 'prop-types';
import { ImageGallery } from './ImageGallery.style';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export const GalleryList = ({ pictures, onClick }) => {
  return (
    <ImageGallery>
      {pictures.map(item => (
        <ImageGalleryItem key={item.id} itemData={item} onClick={onClick} />
      ))}
    </ImageGallery>
  );
};

GalleryList.propTypes = {
  pictures: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
