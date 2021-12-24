import React, { Component } from 'react';
import SearchBar from 'components/SearchBar/SearchBar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';
import Button from './components/Button/Button';
import Idle from 'components/ImageGallery/status/Idle';
import Spiner from 'components/ImageGallery/spiner/Spiner';
import Rejected from 'components/ImageGallery/status/Rejected';
import FotoHistory from 'components/FotoHistory/FotoHistory';
/* import { ToastContainer } from 'react-toastify'; */
import Api from './service/Api';
class App extends Component {
  state = {
    searchForm: '',
    showModal: false,
    localHostStatus: false,
    storeFoto: null,
    largeUrl: null,
    page: 1,
    status: 'idle',
    arrayImage: [],
    error: '',
  };

  saveSearch = searchForm => {
    this.setState({
      searchForm,
      localHostStatus: false,
    });
  };
  componentDidMount() {
    const localArray = JSON.parse(localStorage.getItem('myFoto'));
    if (localArray) {
      this.setState({
        storeFoto: localArray,
      });
    }
    window.onunload = () => {
      localStorage.setItem('myFoto', JSON.stringify(this.state.storeFoto));
    };
  }
  componentDidUpdate(prevProps, prevState) {
    const { largeUrl, searchForm, page, storeFoto, status } = this.state;

    if (largeUrl) {
      if (!storeFoto) {
        this.setState({ storeFoto: [largeUrl] });
        return;
      }

      if (!storeFoto.find(foto => largeUrl.id === foto.id)) {
        this.setState(prevState => ({
          storeFoto: [...prevState.storeFoto, largeUrl],
        }));
        return;
      }
    }

    if (prevState.page !== page) {
      this.apiArray(searchForm, page).then(res => {
        this.setState(prevState => ({
          arrayImage: [...prevState.arrayImage, ...res],
          status: 'resolved',
        }));
        document
          .getElementById('scroll')
          .scrollIntoView({ block: 'center', behavior: 'smooth' });
      });

      return;
    }
    if (prevState.searchForm !== searchForm) {
      this.setState({ status: 'pending', arrayImage: [] });
      this.apiArray(searchForm, 1)
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
              `По вашему запросу ${searchForm} небыло совпадений, крутите барабан`,
            ),
          );
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
    if (status === 'rejected') {
      setTimeout(() => {
        this.setState({ status: 'idle' });
      }, 2000);
    }
  }
  clearHistory = () => {
    this.setState({ storeFoto: null, largeUrl: null });
  };
  apiArray = (formRes, page) => {
    return Api(formRes, page);
  };
  morePage = () => {
    this.setState(prevState => ({
      status: 'pending',
      page: prevState.page + 1,
    }));
  };
  startStatus = () => {
    this.setState({
      status: 'idle',
    });
  };

  localStorStatus = () => {
    this.setState(({ localHostStatus }) => ({
      localHostStatus: !localHostStatus,
    }));
  };
  takeLarge = largeUrl => {
    this.setState({ largeUrl });
    this.toggleModal();
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  render() {
    const {
      localHostStatus,
      showModal,
      largeUrl,
      storeFoto,
      status,
      arrayImage,
      error,
    } = this.state;
    let style = null;
    if (localHostStatus) {
      style = { display: 'none' };
    }
    return (
      <div>
        {showModal && (
          <Modal url={largeUrl.largeImageURL} toggle={this.toggleModal} />
        )}
        <SearchBar
          saveSubmit={this.saveSearch}
          upLocalStatus={this.localStorStatus}
          status={localHostStatus}
        />
        <ImageGallery
          returnUrl={this.takeLarge}
          arrayImage={arrayImage}
          storeFoto={storeFoto}
          localHostStatus={localHostStatus}
          resetStatus={this.startStatus}
          style={style}
        />

        {localHostStatus && (
          <FotoHistory
            foto={storeFoto}
            returnUrl={this.takeLarge}
            clearHistory={this.clearHistory}
          />
        )}

        {arrayImage[0]?.loadMore > 12 && !localHostStatus && (
          <Button morePage={this.morePage} total={arrayImage[0].loadMore} />
        )}
        {status === 'idle' && !localHostStatus && <Idle />}

        {status === 'pending' && <Spiner />}

        {status === 'rejected' && <Rejected error={error.message} />}
      </div>
    );
  }
}
/*  <ToastContainer autoClose={3000} />; */
export default App;
