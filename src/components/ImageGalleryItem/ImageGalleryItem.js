import s from './ImageGalleryItem.module.css';
export default function ImageGalleryItem({ formRes }) {
  return (
    <>
      {!formRes && <h1>Тут будут ваши просмотренные фото</h1>}
      {formRes &&
        formRes.map(el => (
          <li key={el.id} className={s.ImageGalleryItem}>
            <img
              src={el.webformatURL}
              alt="tags"
              className={s.ImageGalleryItem_image}
            />
          </li>
        ))}
    </>
  );
}
