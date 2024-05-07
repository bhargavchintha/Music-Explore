import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchPage = ({ searchQuery }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        if (!searchQuery) {
          return; // If there is no search query, do nothing
        }
        
        const response = await axios.get(`/Searchtext?songname=${encodeURIComponent(searchQuery)}`);
        setSearchResults(response.data.searchdata);
        setError('');
      } catch (err) {
        if (err.response) {
          setError(err.response.data.error);
        } else {
          setError('An error occurred while processing your request');
        }
        setSearchResults([]);
      }
    };

    fetchSearchResults();
  }, [searchQuery]); 

  return (
    <div className='Search' >
      
<title>Search bar</title>

      {error && <div className="error"> {searchQuery} No Result Found</div>}
      <div className="search-results">
        <div className='Search_Name'>{searchQuery}</div>
        {searchResults.map((search) => (
          <div key={search.songid}>
            <h3>{search.songname}</h3>
           
            {/* Render other song details as needed */}
          </div>
        ))}



      </div>
    </div>
  );
};

export default SearchPage;
