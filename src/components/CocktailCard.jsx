import React from "react";
import '../styles/cocktailCard.css'; // Importation du CSS spécifique à la carte

const CocktailCard = ({ cocktail }) => {
  if (!cocktail) return null;

  const {
    strDrink,
    strDrinkThumb,
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
  } = cocktail;

  const ingredients = [
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
  ].filter(Boolean);

  return (
    <div className="cocktail-card">
      <img
        src={strDrinkThumb}
        alt={strDrink}
        className="cocktail-card-img"
      />
      <div className="cocktail-card-content">
        <h2 className="cocktail-title">{strDrink}</h2>
        <div className="ingredients">
          {ingredients.map((ingredient, index) => (
            <img
              key={index}
              src={`https://www.thecocktaildb.com/images/ingredients/${ingredient}-Medium.png`}
              alt={ingredient}
              className="ingredient-img"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CocktailCard;
