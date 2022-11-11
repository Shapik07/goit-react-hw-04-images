import PropTypes from 'prop-types';
import { ListItem, Img } from './ImageGalleryItem.styled';

function ImageGalleryItem({ itemData, onClick }) {
  const { id, webformatURL, largeImageURL } = itemData;
  return (
    <ListItem
      className="gallery-item"
      key={id}
      onClick={() => onClick(largeImageURL)}
    >
      <Img src={webformatURL} alt=" " />
    </ListItem>
  );
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  itemData: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
