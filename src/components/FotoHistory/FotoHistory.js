import PropTypes from 'prop-types';
import s from './FotoHistory.module.css';
export default function FotoHistory({ foto, returnUrl, clearHistory }) {
  return (
    <ul className={s.ImageGallery}>
      {foto && <button onClick={clearHistory}>Clear History</button>}
      {foto &&
        foto.map(el => (
          <li key={el.id} className={s.ImageGalleryItem}>
            <img
              onClick={() => {
                returnUrl(el);
              }}
              src={el.webformatURL}
              alt="tags"
              className={s.ImageGalleryItem_image}
            />
          </li>
        ))}
    </ul>
  );
}

FotoHistory.propTypes = {
  foto: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    }),
  ),
  returnUrl: PropTypes.func.isRequired,
};
