import React, { Component } from 'react';
import SearchBar from 'components/SearchBar/SearchBar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';
import Button from './components/Button/Button';
import Idle from 'components/ImageGallery/status/Idle';
import Spiner from 'components/ImageGallery/status/spiner/Spiner';
import Rejected from 'components/ImageGallery/status/Rejected';
/* import { ToastContainer } from 'react-toastify'; */
import Api from './service/Api';
class App extends Component {
  state = {
    searchForm: '',
    showModal: false,
    largeUrl: null,
    page: 1,
    status: 'idle',
    arrayImage: [],
    error: '',
  };

  saveSearch = searchForm => {
    this.setState({
      searchForm,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchForm, page, status } = this.state;

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
    const { showModal, largeUrl, status, arrayImage, error } = this.state;

    return (
      <div>
        <SearchBar saveSubmit={this.saveSearch} />
        <ImageGallery
          returnUrl={this.takeLarge}
          arrayImage={arrayImage}
          resetStatus={this.startStatus}
        />
        {showModal && (
          <Modal url={largeUrl.largeImageURL} toggle={this.toggleModal} />
        )}
        {arrayImage[0]?.loadMore > 12 && (
          <Button morePage={this.morePage} total={arrayImage[0].loadMore} />
        )}
        {status === 'idle' && <Idle />}

        {status === 'pending' && <Spiner />}

        {status === 'rejected' && <Rejected error={error.message} />}
      </div>
    );
  }
}
export default App;
