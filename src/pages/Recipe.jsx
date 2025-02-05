import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useRecipe from "../api/useRecipe";
import "../styles/recipe.css";

const Recipe = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("id");
  const { recipe, loading, error } = useRecipe(query);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!recipe) return <p>Cocktail non trouvé</p>;

  return (
    <div className="recipe-container">
      <button className="back-button" onClick={() => navigate(-1)}>
      <i className="fas fa-arrow-left"></i>
      </button>

      <div className="recipe-header">
        <h1 className="recipe-name">{recipe.strDrink}</h1>
      </div>

      <div className="recipe-body">
        <div className="recipe-image-container">
          <img
            src={recipe.strDrinkThumb}
            alt={recipe.strDrink}
            className="recipe-image"
          />
        </div>

        <div className="ingredients-container">
          <h3>Ingrédients</h3>
          <ul className="ingredients-list">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="ingredient-item">
                <img
                  src={ingredient.image}
                  alt={ingredient.name}
                  className="ingredient-image"
                />
                <div className="ingredient-details">
                  <span className="ingredient-name">{ingredient.name}</span>
                  {ingredient.measure && (
                    <span className="ingredient-measure">{ingredient.measure}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="recipe-instructions">
        <p>{recipe.strInstructions}</p>
      </div>
    </div>
  );
};

export default Recipe;
