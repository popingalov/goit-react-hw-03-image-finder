import s from './Button.module.css';
export default function Button({ morePage, total }) {
  return (
    <button className={s.Button} onClick={morePage}>
      Найдено:{total}foto <br />
      Load More
    </button>
  );
}
