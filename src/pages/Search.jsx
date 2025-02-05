import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useSearchCocktails from '../api/useSearchCocktails';
import CocktailCard from '../components/CocktailCard';
import '../styles/search.css';

const Search = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query') || ''; 
  const { cocktails, loading, error } = useSearchCocktails(query);

  useEffect(() => {
    const searchContainer = document.getElementsByClassName("search-container")[0];
    if (searchContainer) {
      searchContainer.scrollTo(0, 0);
    }
  }, [query]);

  return (
    <div className="search-container">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
        {cocktails && cocktails.length > 0 ? (
          cocktails.map((cocktail) => (
            <CocktailCard key={cocktail.id} cocktail={cocktail} />
          ))
        ) : (
          <p>No cocktails found.</p>
        )}
    </div>
  );
};

export default Search;
