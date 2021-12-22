import PropTypes from 'prop-types';
import s from './Button.module.css';
export default function Button({ morePage, total }) {
  return (
    <button className={s.Button} onClick={morePage}>
      Найдено:{total}foto <br />
      Load More
    </button>
  );
}

Button.propTypes = {
  morePage: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
};
