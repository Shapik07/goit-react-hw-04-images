import { Component } from 'react';
import { StyledSearchBar } from './Searchbar.styled';
import { SearchForm } from 'components/SearchForm/SearchForm';

export class SearchBar extends Component {
  render() {
    const { handleQuerySubmit } = this.props;
    return (
      <StyledSearchBar className="searchbar">
        <SearchForm handleQuerySubmit={handleQuerySubmit} />
      </StyledSearchBar>
    );
  }
}
