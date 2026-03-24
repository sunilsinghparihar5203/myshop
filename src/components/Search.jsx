import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, selectSearchQuery } from '../features/products/productsSlice';
import './Search.css';

function Search() {
  const dispatch = useDispatch();
  const searchQuery = useSelector(selectSearchQuery);
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalQuery(value);
    dispatch(setSearchQuery(value));
  };

  const handleClear = () => {
    setLocalQuery('');
    dispatch(setSearchQuery(''));
  };

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search products..."
          value={localQuery}
          onChange={handleInputChange}
          className="search-input"
        />
        {localQuery && (
          <button className="search-clear-btn" onClick={handleClear}>
            ×
          </button>
        )}
        <svg
          className="search-icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
      </div>
    </div>
  );
}

export default Search;
