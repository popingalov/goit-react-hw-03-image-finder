import PropTypes from 'prop-types';
import React, { Component } from 'react';
import s from './SearchForm.module.css';
export default class SearchForm extends Component {
  state = {
    searchForm: '',
  };

  SaveValue = e => {
    this.setState({
      searchForm: e.target.value,
    });
  };

  Submit = e => {
    e.preventDefault();
    if (this.state.searchForm.trim() === '') {
      alert('Введите текст');
      this.setState({ searchForm: '' });
      return;
    }
    this.props.saveSubmit(this.state.searchForm.toLowerCase());
    this.setState({ searchForm: '' });
  };

  render() {
    return (
      <form className={s.SearchForm} onSubmit={this.Submit}>
        <button type="submit" className={s.SearchForm_button}>
          <span className={s.SearchForm_button_label}>Search</span>
        </button>

        <input
          className={s.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={this.state.searchForm}
          onChange={this.SaveValue}
        />
      </form>
    );
  }
}

SearchForm.propTypes = {
  saveSubmit: PropTypes.func.isRequired,
};
