import { StyledSearchBar } from './Searchbar.styled';
import { SearchForm } from 'components/SearchForm/SearchForm';

export default function SearchBar({ handleQuerySubmit }) {
  return (
    <StyledSearchBar className="searchbar">
      <SearchForm handleQuerySubmit={handleQuerySubmit} />
    </StyledSearchBar>
  );
}
