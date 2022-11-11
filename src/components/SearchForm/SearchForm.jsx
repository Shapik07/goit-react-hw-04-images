import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';
import {
  SearchFormButton,
  SearchButtonLabel,
  SearchFormInput,
  StyledSearchForm,
} from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    query: '',
  };

  static propTypes = {
    handleQuerySubmit: PropTypes.func.isRequired,
  };

  handleQueryChange = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.query.trim() === '') {
      toast.info('Please enter a request');
      return;
    }
    this.props.handleQuerySubmit(this.state.query);

    this.setState({ query: '' });
  };

  render() {
    return (
      <StyledSearchForm className="form" onSubmit={this.handleSubmit}>
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
          value={this.state.query}
          onChange={this.handleQueryChange}
        />
      </StyledSearchForm>
    );
  }
}
