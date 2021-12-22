import React, { Component } from 'react';
import SearchBar from 'components/SearchBar/SearchBar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';
/* import { ToastContainer } from 'react-toastify'; */
class App extends Component {
  state = {
    searchForm: '',
    showModal: false,
    localHostStatus: false,
    largeUrl: null,
  };
  local = [];
  saveSearch = searchForm => {
    this.setState({
      searchForm,
    });
  };
  componentDidUpdate(prevProps, prevState) {}

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
    const { localHostStatus, searchForm, showModal, largeUrl } = this.state;
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
          formRes={searchForm}
          localFoto={largeUrl}
          localHostStatus={localHostStatus}
        />
      </div>
    );
  }
}
/*  <ToastContainer autoClose={3000} />; */
export default App;
