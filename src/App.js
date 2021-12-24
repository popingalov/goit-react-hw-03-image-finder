import React, { Component } from 'react';
import SearchBar from 'components/SearchBar/SearchBar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';
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
  componentDidUpdate(prevProps, prevState) {
    const { largeUrl, searchForm, page } = this.state;

    const localArray = JSON.parse(localStorage.getItem('myFoto'));
    if (largeUrl) {
      if (!localArray) {
        localStorage.setItem('myFoto', JSON.stringify([largeUrl]));
        this.setState({ storeFoto: [largeUrl] });
        return;
      }

      if (!localArray.find(foto => largeUrl.id === foto.id)) {
        localArray.push(largeUrl);
        localStorage.setItem('myFoto', JSON.stringify(localArray));
        this.setState({ storeFoto: localArray });
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
      this.setState({ status: 'pending' });
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
  }

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
          morePage={this.morePage}
          returnUrl={this.takeLarge}
          status={status}
          storeFoto={storeFoto}
          localHostStatus={localHostStatus}
          arrayImage={arrayImage}
          resetStatus={this.startStatus}
          errorMessage={error.message}
        />
      </div>
    );
  }
}
/*  <ToastContainer autoClose={3000} />; */
export default App;
