import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Search = () => {
  const location = useLocation();
  const [cocktails, setCocktails] = useState([]);
  const searchQuery = new URLSearchParams(location.search).get('query');  // Récupérer la query string

  useEffect(() => {
    if (searchQuery) {
      // Si un terme de recherche est présent dans l'URL, on effectue une recherche
      const fetchCocktails = async () => {
        try {
          const response = await fetch(
            `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchQuery}`
          );
          const data = await response.json();
          setCocktails(data.drinks || []); // Si des résultats sont trouvés
        } catch (error) {
          console.error("Erreur lors de la récupération des cocktails :", error);
        }
      };

      fetchCocktails();
    }
  }, [searchQuery]);

  return (
    <div className="page">
      <h1>Search Page</h1>
      {searchQuery && cocktails.length === 0 ? (
        <p>No cocktails found for "{searchQuery}"</p>
      ) : (
        <div>
          {cocktails.length > 0 ? (
            cocktails.map((cocktail) => (
              <div key={cocktail.idDrink}>
                <h3>{cocktail.strDrink}</h3>
                <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} width="100" />
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
