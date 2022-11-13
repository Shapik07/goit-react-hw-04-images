import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';
import {
  SearchFormButton,
  SearchButtonLabel,
  SearchFormInput,
  StyledSearchForm,
} from './SearchForm.styled';

export default function SearchForm({ handleQuerySubmit }) {
  const [query, setQuery] = useState('');

  const handleQueryChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      toast.info('Please enter a request');
      return;
    }
    handleQuerySubmit(query);

    setQuery('');
  };

  return (
    <StyledSearchForm className="form" onSubmit={handleSubmit}>
      <SearchFormButton type="submit" className="button">
        <FaSearch />
        <SearchButtonLabel className="button-label">Search</SearchButtonLabel>
      </SearchFormButton>

      <SearchFormInput
        className="input"
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        value={query}
        onChange={handleQueryChange}
      />
    </StyledSearchForm>
  );
}

SearchForm.propTypes = {
  handleQuerySubmit: PropTypes.func.isRequired,
};
