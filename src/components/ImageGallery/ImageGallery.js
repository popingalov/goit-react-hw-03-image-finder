import PropTypes from 'prop-types';
import { Component } from 'react';
import s from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Api from '../../service/Api';
import Spiner from './spiner/Spiner';
import Idle from './status/Idle';
import Rejected from './status/Rejected';
import Button from './Button/Button';

export default class ImageGallery extends Component {
  state = {
    arrayImage: null,
    status: 'idle',
    error: '',
    storeFoto: null,
    page: 1,
  };
  componentDidMount() {
    if (JSON.parse(localStorage.getItem('myFoto'))) {
      const localArray = JSON.parse(localStorage.getItem('myFoto'));
      this.setState({
        storeFoto: localArray,
      });
    }
  }

  morePage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  apiArray = (formRes, page) => {
    return Api(formRes, page);
  };

  componentDidUpdate(prevProps, prevState) {
    const { formRes, localFoto } = this.props;
    const { page } = this.state;
    const localArray = JSON.parse(localStorage.getItem('myFoto'));
    if (localFoto !== prevProps.localFoto) {
      if (!localArray) {
        localStorage.setItem('myFoto', JSON.stringify([localFoto]));
        this.setState({ storeFoto: [localFoto] });
        return;
      }

      if (!localArray.find(foto => localFoto.id === foto.id)) {
        localArray.push(localFoto);
        localStorage.setItem('myFoto', JSON.stringify(localArray));
        this.setState({ storeFoto: localArray });
        return;
      }
    }

    if (prevState.page !== page) {
      this.apiArray(formRes, page).then(res => {
        this.setState(prevState => ({
          arrayImage: [...prevState.arrayImage, ...res],
        }));
      });
      return;
    }
    if (prevProps.formRes !== formRes) {
      this.setState({ status: 'pending' });
      this.apiArray(formRes, page)
        .then(res => {
          if (res.length > 0) {
            this.setState({
              arrayImage: res,
              status: 'resolved',
            });
            return;
          }
          return Promise.reject(
            new Error(
              `По вашему запросу ${formRes} небыло совпадений, крутите барабан`,
            ),
          );
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  render() {
    const { arrayImage, status, error, storeFoto } = this.state;
    const { localHostStatus, returnUrl } = this.props;
    if (localHostStatus) {
      return (
        <ul className={s.ImageGallery}>
          <ImageGalleryItem formRes={storeFoto} returnUrl={returnUrl} />
        </ul>
      );
    }
    if (status === 'idle') {
      return <Idle />;
    }
    if (status === 'pending') {
      return <Spiner />;
    }
    if (status === 'rejected') {
      setTimeout(() => {
        this.setState({ status: 'idle' });
      }, 2000);
      return <Rejected error={error} />;
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={s.ImageGallery}>
            <ImageGalleryItem formRes={arrayImage} returnUrl={returnUrl} />
          </ul>
          {arrayImage[0].loadMore > 12 && !localHostStatus && (
            <Button morePage={this.morePage} total={arrayImage[0].loadMore} />
          )}
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  formRes: PropTypes.string.isRequired,
  localFoto: PropTypes.shape({
    id: PropTypes.number.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
  }),
  localHostStatus: PropTypes.bool.isRequired,
  returnUrl: PropTypes.func,
};
