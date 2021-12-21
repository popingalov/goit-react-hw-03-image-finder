import React, { Component } from 'react';
import s from './SearchBar.module.css';
import SearchForm from 'components/SearchForm/SearchForm';

export default class SearchBar extends Component {
  render() {
    return (
      <header className={s.Searchbar}>
        <SearchForm saveSubmit={this.props.saveSubmit} />
      </header>
    );
  }
}
