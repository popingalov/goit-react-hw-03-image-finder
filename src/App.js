import React, { Component } from 'react';
import SearchBar from 'components/SearchBar/SearchBar';
import ImageGallery from 'components/ImageGallery/ImageGallery';

/* import { ToastContainer } from 'react-toastify'; */
class App extends Component {
  state = {
    searchForm: '',
    showModal: false,
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

  render() {
    return (
      <div>
        {this.state.showModal && <h1>Грузим</h1>}
        <button onClick={this.testThis}>click me</button>
        <SearchBar saveSubmit={this.saveSearch} />
        <ImageGallery
          spiner={this.toggleSpiner}
          formRes={this.state.searchForm}
        />
      </div>
    );
  }
}
/*  <ToastContainer autoClose={3000} />; */
export default App;
