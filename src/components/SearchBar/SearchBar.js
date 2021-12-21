import React, { Component } from 'react';
import s from './SearchBar.module.css';
import SearchForm from 'components/SearchForm/SearchForm';

export default class SearchBar extends Component {
  render() {
    const { status, saveSubmit, upLocalStatus } = this.props;
    return (
      <header className={s.Searchbar}>
        <SearchForm saveSubmit={saveSubmit} />
        <button onClick={upLocalStatus}>
          {!status ? 'Моя История фото' : 'Назад к поиску'}
        </button>
      </header>
    );
  }
}
