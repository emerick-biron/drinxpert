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
    window.scrollTo(0, 0); // Remonte en haut de la page à chaque nouvelle recherche
  }, [query]);

  return (
    <div className="search-container">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
        {cocktails && cocktails.length > 0 ? (
          cocktails.map((cocktail) => (
            <CocktailCard key={cocktail.idDrink} cocktail={cocktail} />
          ))
        ) : (
          <p>No cocktails found.</p>
        )}
    </div>
  );
};

export default Search;
