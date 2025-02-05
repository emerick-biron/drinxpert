import React from "react";
import '../styles/cocktailCard.css'; // Importation du CSS spécifique à la carte

const CocktailCard = ({ cocktail }) => {
  if (!cocktail) return null;

  return (
    <div className="cocktail-card">
      <h3 className="cocktail-card-name">{cocktail.name}</h3>
      <img
        src={cocktail.thumb}
        alt={cocktail.name}
        className="cocktail-card-img"
      />
    </div>
  );
};

export default CocktailCard;
