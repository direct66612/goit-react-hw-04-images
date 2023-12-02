import { useState } from 'react';
import css from './Searchbar.module.css';
export const Searchbar = ({ handleSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  const handleChange = event => {
    setInputValue(event.target.value);
  };

  const handleAction = event => {
    event.preventDefault();
    handleSubmit(inputValue);
  };
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleAction}>
        <button type="submit" className={css['SearchForm-button']}>
          <span className={css['SearchForm-button-label']}>Search</span>
        </button>

        <input
          className={css['SearchForm-input']}
          name="input"
          type="text"
          autoComplete="off"
          value={inputValue}
          onChange={handleChange}
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
