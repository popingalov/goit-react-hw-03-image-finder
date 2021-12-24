import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';
export default function ImageGalleryItem({ formRes, returnUrl }) {
  return (
    <>
      {!formRes && <h1>Просмотренных фото ещё нет</h1>}
      {formRes &&
        formRes.map((el, ind) => (
          <li key={el.id} className={s.ImageGalleryItem}>
            <img
              onClick={() => {
                returnUrl(el);
              }}
              src={el.webformatURL}
              alt="tags"
              className={s.ImageGalleryItem_image}
            />
            {ind === formRes.length - 12 && <div id="scroll"></div>}
          </li>
        ))}
    </>
  );
}

ImageGalleryItem.propTypes = {
  formRes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    }),
  ),
  returnUrl: PropTypes.func.isRequired,
};
