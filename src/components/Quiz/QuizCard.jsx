import { useState } from "react";
import QuizCardButton from "./QuizCardButton";
import "../../styles/QuizCard.css";

const QuizCard = ({ cocktail }) => {
    if (!cocktail) return <div>Loading...</div>;

    const { strDrink, strDrinkThumb, ingredients = [], secretIngredientName, missingIngredients = [] } = cocktail;

    const [coloredButton, setColoredButton] = useState({ id: null, color: "white" });

    const handleButtonClick = (ingredient, id) => {
        const newColor = ingredient === secretIngredientName ? "green" : "red";
        setColoredButton({ id, color: newColor });
    };

    return (
        <div className="quiz-card">
            <h1 className="quiz-title">{strDrink}</h1>
            <img className="quiz-image" src={strDrinkThumb} alt={strDrink} />

            <ul className="quiz-ingredients">
                {ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>

            <div className="quiz-buttons">
                {missingIngredients.map((missingIngredient, index) => (
                    <QuizCardButton
                        key={index}
                        onButtonClick={handleButtonClick}
                        name={missingIngredient}
                        id={index}
                        color={coloredButton.id === index ? coloredButton.color : "white"}
                    />
                ))}
            </div>
        </div>
    );
};

export default QuizCard;