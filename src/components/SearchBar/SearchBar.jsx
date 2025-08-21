import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiSearch } from 'react-icons/fi';
import css from './SearchBar.module.css';

export default function SearchBar({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleChange = e => setValue(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    const q = value.trim();

    if (!q) {
      toast.error('Enter text to search images');
      return;
    }

    onSubmit(q);
  };

  return (
    <header className={css.header}>
      <form
        className={css.form}
        onSubmit={handleSubmit}
        aria-label="Search photos"
      >
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={handleChange}
        />
        <button className={css.btn} type="submit" aria-label="Search">
          <FiSearch className={css.icon} />
        </button>
      </form>
    </header>
  );
}
