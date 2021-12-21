import { Component } from 'react';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Api from '../../service/Api';
export default class ImageGallery extends Component {
  state = {
    arrayImage: null,
    loadSpiner: false,
  };
  componentDidMount() {
    /*  const test = [
      {
        id: 434918,
        largeImageURL:
          'https://pixabay.com/get/g8a050f3dbfe71aac158d7d598f4387332af9eb822d3df595cf0976d2f36a17321afd72f5d1687d177183e839b020d48e2a91924ad724abeba48e8cb0b39cbd54_1280.jpg',
        webformatURL:
          'https://pixabay.com/get/g75c9eda7c986c7288225a9bb06619b30a65fcff1b8656b53a5c387e78fe9b76d6f3d4528c227365dc98104ce1ee6c54f_640.jpg',
      },
    ];
    const newTest = JSON.stringify(test);
    localStorage.setItem('myFoto', newTest); */
    if (JSON.parse(localStorage.getItem('myFoto'))) {
      const localArray = JSON.parse(localStorage.getItem('myFoto'));
      this.setState({
        arrayImage: localArray,
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const { formRes } = this.props;

    if (prevProps.formRes !== formRes) {
      this.setState({ loadSpiner: true });
      Api(formRes, 1)
        .then(res => {
          res.length > 0
            ? this.setState({
                arrayImage: res,
              })
            : alert(
                `По вашему запросу ${formRes} небыло совпадений, крутите барабан`,
              );
        })
        .catch(err => alert(err))
        .finally(
          setTimeout(() => {
            this.setState({ loadSpiner: false });
          }, 500),
        );
    }
  }

  render() {
    const { loadSpiner, arrayImage } = this.state;
    return (
      <ul className={s.ImageGallery}>
        {loadSpiner && (
          <div className={s.loader}>
            <div className={`${s.inner} ${s.one}`}></div>
            <div className={`${s.inner} ${s.two}`}></div>
            <div className={`${s.inner} ${s.three}`}></div>
          </div>
        )}
        <ImageGalleryItem formRes={arrayImage} />
      </ul>
    );
  }
}
/* const testThis = () => {
       this.setState({ showModal: true });
      Api('cat', 1)
        .then(res =>
          this.setState({
            searchImage: res,
          }),
        )
        .catch(err => alert(err));
      .finally(this.setState({ showModal: false }));
    }; */
