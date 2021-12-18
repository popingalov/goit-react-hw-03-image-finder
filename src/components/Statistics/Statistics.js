import PropTypes from 'prop-types';

export default function Statistics({
  bad,
  neutral,
  good,
  total = 0,
  positivePercentage = 0,
}) {
  return (
    <div>
      <p>Bad:{bad}</p>
      <p>Good:{good}</p>
      <p>Neutral:{neutral}</p>
      <p>Total: {total}</p>
      <p>Positive feedback: {positivePercentage}%</p>
    </div>
  );
}

Statistics.propTypes = {
  bad: PropTypes.number.isRequired,
  good: PropTypes.number.isRequired,
  neutral: PropTypes.number.isRequired,
  positivePercentage: PropTypes.number,
  total: PropTypes.number,
};
