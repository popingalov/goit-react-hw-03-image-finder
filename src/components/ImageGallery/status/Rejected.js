import PropTypes from 'prop-types';
export default function Rejected({ error }) {
  return <h1>{error.message}</h1>;
}

Rejected.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};
