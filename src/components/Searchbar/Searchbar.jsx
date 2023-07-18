import { useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineSearch } from 'react-icons/ai';
import {
  SearchForm,
  SearchFormBtnlabel,
  SearchFormButton,
  SearchFormInput,
  SearchbarStyled,
} from './Searchbar.styled';


export default function Searchbar({ onFormSubmit }) {
  const [query, setQuery] = useState('');

  
  const handleChange = event => {
    setQuery(event.target.value.toLowerCase().trim());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      return;
    }
    onFormSubmit(query);
    setQuery('');
  };

  return (
    <SearchbarStyled>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          {' '}
          <AiOutlineSearch size={24} />
          <SearchFormBtnlabel>Search</SearchFormBtnlabel>
        </SearchFormButton>

        <SearchFormInput
          value={query}
          onChange={handleChange}
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
        />
      </SearchForm>
    </SearchbarStyled>
  );
}

Searchbar.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};
