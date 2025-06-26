import React from 'react';
import { Search } from 'lucide-react';
import { X } from 'lucide-react';

const SearchBar = ({ searchQuery, handleSearch, handleCancel, handleSearchInput }) => {
  return (
    <div className="flex gap-2">
      <input
        value={searchQuery}
        onChange={handleSearchInput}
        placeholder="Search..."
        className="border px-2 py-1 rounded"
      />
      <div className="flex gap-2">
        <button
        className='text-accent hover:bg-yellow-300 hover:text-black' onClick={handleSearch}><Search /></button>
        <button 
        className='text-red-500 hover:bg-red-400 hover:text-black'
        onClick={handleCancel}><X /></button>
      </div>
    </div>
  );
};

export default SearchBar;
