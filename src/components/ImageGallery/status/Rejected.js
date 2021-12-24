import PropTypes from 'prop-types';
export default function Rejected({ error }) {
  return <h1>{error}</h1>;
}

Rejected.propTypes = {
  error: PropTypes.string,
};
