import PropTypes from 'prop-types';
import s from './Modal.module.css';
import { createPortal } from 'react-dom';
import { Component } from 'react/cjs/react.production.min';
const modalRoot = document.querySelector('#modal-root');
export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    e.code === 'Escape' && this.props.toggle();
  };
  handleBackdropClick = e => {
    e.currentTarget === e.target && this.props.toggle();
  };
  render() {
    const { url } = this.props;
    return createPortal(
      <div className={s.Overlay} onClick={this.handleBackdropClick}>
        <div className={s.Modal}>
          <img src={url} alt="" />
        </div>
      </div>,
      modalRoot,
    );
  }
}

Modal.propTypes = {
  toggle: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};
