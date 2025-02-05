import { useState, useEffect } from 'react';
import Fuse from 'fuse.js';

const useSearchCocktails = (query) => {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchCocktails = async () => {
      setLoading(true);
      setError(null);
      let allCocktails = [];

      try {
        const responseByName = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`
        );
        const dataByName = await responseByName.json();
        if (dataByName.drinks) {
          allCocktails = [...dataByName.drinks]; 
        }

        const responseIngredients = await fetch(
          'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list'
        );
        const dataIngredients = await responseIngredients.json();

        if (dataIngredients.drinks) {
          const fuse = new Fuse(dataIngredients.drinks, {
            keys: ['strIngredient1'], 
            threshold: 0.4, 
          });

          const matchingIngredients = fuse.search(query).map((result) => result.item);

          for (const ingredient of matchingIngredients) {
            const responseByIngredient = await fetch(
              `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient.strIngredient1}`
            );
            const dataByIngredient = await responseByIngredient.json();

            if (dataByIngredient.drinks) {
              allCocktails = [...allCocktails, ...dataByIngredient.drinks]; 
            }
          }
        }

        // Reformater les cocktails pour ne garder que l'ID, le nom et l'image
        const reformattedCocktails = allCocktails.map((cocktail) => ({
          id: cocktail.idDrink,
          name: cocktail.strDrink,
          thumb: cocktail.strDrinkThumb,
        }));

        // Éliminer les doublons basés sur l'idDrink
        const uniqueCocktails = Array.from(
          new Map(reformattedCocktails.map((c) => [c.id, c])).values()
        );

        setCocktails(uniqueCocktails);
      } catch (error) {
        setError('Erreur lors de la récupération des cocktails');
      } finally {
        setLoading(false);
      }
    };

    fetchCocktails();
  }, [query]);

  return { cocktails, loading, error };
};

export default useSearchCocktails;
