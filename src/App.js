import React, { Component } from 'react';
import SearchBar from 'components/SearchBar/SearchBar';
import ImageGallery from 'components/ImageGallery/ImageGallery';

/* import { ToastContainer } from 'react-toastify'; */
class App extends Component {
  state = {
    searchForm: '',
    showModal: false,
    localHostStatus: false,
  };

  saveSearch = searchForm => {
    this.setState({
      searchForm,
    });
  };
  toggleSpiner = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  localStorStatus = () => {
    this.setState(({ localHostStatus }) => ({
      localHostStatus: !localHostStatus,
    }));
  };

  render() {
    return (
      <div>
        {this.state.showModal && <h1>Грузим</h1>}
        <SearchBar
          saveSubmit={this.saveSearch}
          upLocalStatus={this.localStorStatus}
          status={this.state.localHostStatus}
        />
        <ImageGallery
          formRes={this.state.searchForm}
          localHostStatus={this.state.localHostStatus}
        />
      </div>
    );
  }
}
/*  <ToastContainer autoClose={3000} />; */
export default App;
