import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/cocktailCard.css';

const CocktailCard = ({ cocktail }) => {
  const navigate = useNavigate();

  if (!cocktail) return null;

  const handleClick = () => {
    navigate(`/recipe?id=${cocktail.id}`);
  };

  return (
    <div className="cocktail-card" onClick={handleClick}>
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
