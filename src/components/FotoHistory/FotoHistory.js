import s from './FotoHistory.module.css';
export default function FotoHistory({ foto, returnUrl }) {
  return (
    <ul className={s.ImageGallery}>
      {foto &&
        foto.map(el => (
          <li key={el.id} /* className={s.ImageGalleryItem} */>
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
