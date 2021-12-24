import { PropTypes } from 'prop-types';
import s from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ returnUrl, arrayImage, style }) {
  return (
    <>
      <ul className={s.ImageGallery} style={style}>
        <ImageGalleryItem formRes={arrayImage} returnUrl={returnUrl} />
      </ul>
    </>
  );
}

ImageGallery.propTypes = {
  arrayImage: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    }),
  ),
  returnUrl: PropTypes.func.isRequired,
};
