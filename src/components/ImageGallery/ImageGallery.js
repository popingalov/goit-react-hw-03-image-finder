import { PropTypes } from 'prop-types';

import s from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Spiner from './spiner/Spiner';
import Idle from './status/Idle';
import Rejected from './status/Rejected';
import Button from './Button/Button';

export default function ImageGallery({
  localHostStatus,
  returnUrl,
  storeFoto,
  morePage,
  status,
  arrayImage,
  errorMessage,
  resetStatus,
}) {
  if (localHostStatus) {
    return (
      <ul className={s.ImageGallery}>
        <ImageGalleryItem formRes={storeFoto} returnUrl={returnUrl} />
      </ul>
    );
  }
  if (status === 'idle') {
    return <Idle />;
  }
  if (status === 'pending') {
    return <Spiner />;
  }
  if (status === 'rejected') {
    setTimeout(() => {
      resetStatus();
    }, 2000);
    return <Rejected error={errorMessage} />;
  }

  if (status === 'resolved') {
    return (
      <>
        <ul className={s.ImageGallery}>
          <ImageGalleryItem formRes={arrayImage} returnUrl={returnUrl} />
        </ul>
        {arrayImage[0].loadMore > 12 && !localHostStatus && (
          <Button morePage={morePage} total={arrayImage[0].loadMore} />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  arrayImage: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    }),
  ),
  errorMessage: PropTypes.string,
  localHostStatus: PropTypes.bool.isRequired,
  morePage: PropTypes.func.isRequired,
  resetStatus: PropTypes.func.isRequired,
  returnUrl: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  storeFoto: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    }),
  ),
};
