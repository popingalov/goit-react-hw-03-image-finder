import PropTypes from 'prop-types';
import React, { Component } from 'react';
import s from './SearchBar.module.css';
import SearchForm from 'components/SearchForm/SearchForm';

export default class SearchBar extends Component {
  render() {
    const { saveSubmit } = this.props;
    return (
      <header className={s.Searchbar}>
        <SearchForm saveSubmit={saveSubmit} />
      </header>
    );
  }
}

SearchBar.propTypes = {
  saveSubmit: PropTypes.func.isRequired,
};
