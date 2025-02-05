import { useState, useEffect } from "react";

const useRecipe = (id) => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchRecipe = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await response.json();

        if (data.drinks) {
          const drink = data.drinks[0];
          
          // Structurer les ingrédients et unités
          const ingredients = [];
          for (let i = 1; i <= 15; i++) {
            const ingredientKey = `strIngredient${i}`;
            const measureKey = `strMeasure${i}`;
            if (drink[ingredientKey]) {
              ingredients.push({
                name: drink[ingredientKey],
                measure: drink[measureKey] || "",
                image: `https://www.thecocktaildb.com/images/ingredients/${drink[ingredientKey]}.png`
              });
            }
          }

          setRecipe({ ...drink, ingredients });
        } else {
          setRecipe(null);
        }
      } catch (error) {
        setError("Erreur lors de la récupération de la recette");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  return { recipe, loading, error };
};

export default useRecipe;
