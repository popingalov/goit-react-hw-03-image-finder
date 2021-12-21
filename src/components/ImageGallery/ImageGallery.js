import { Component } from 'react';
import s from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Api from '../../service/Api';
import Spiner from './spiner/Spiner';
import Idle from './status/Idle';
import Rejected from './status/Rejected';
export default class ImageGallery extends Component {
  state = {
    arrayImage: null,
    status: 'idle',
    error: '',
    localFoto: null,
  };
  componentDidMount() {
    if (JSON.parse(localStorage.getItem('myFoto'))) {
      const localArray = JSON.parse(localStorage.getItem('myFoto'));
      this.setState({
        localFoto: localArray,
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const { formRes } = this.props;
    if (prevProps.formRes !== formRes) {
      this.setState({ status: 'pending' });
      Api(formRes, 1)
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
    const { arrayImage, status, error, localFoto } = this.state;
    const { localHostStatus } = this.props;

    if (status === 'idle') {
      return <Idle />;
    }
    if (status === 'pending') {
      return <Spiner />;
    }
    if (status === 'rejected') {
      setTimeout(() => {
        this.setState({ status: 'idle' });
      }, 4000);
      return <Rejected error={error} />;
    }

    if (status === 'resolved' || localHostStatus) {
      return (
        <ul className={s.ImageGallery}>
          <ImageGalleryItem
            formRes={localHostStatus ? localFoto : arrayImage}
          />
        </ul>
      );
    }
  }
}
/*  .then(res => {
          res.length > 0
            ? this.setState({
                arrayImage: res,
                status: 'resolved',
              })
            : alert(
                `По вашему запросу ${formRes} небыло совпадений, крутите барабан`,
              );
        }) */
