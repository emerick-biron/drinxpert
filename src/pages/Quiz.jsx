import { useState, useEffect } from "react";
import { useGetRandomCocktail } from "../api/Quiz";



const Quiz = () => {


    const [nextCocktail, setNextCocktail] = useState(0);
    const [cocktail, setCocktail] = useState(null);

    const getRandomCocktail = useGetRandomCocktail();

    useEffect(() => {
        getRandomCocktail.then((cocktail) => {
            console.log(nextCocktail);
        });
    }, [nextCocktail]);

    const handleGoToNextCocktail = () => {
        setNextCocktail(nextCocktail + 1);
    };

    return (
        <div>
            {/* 
                Trouver le bon ingrédient parmi plusieurs propositions en fonction du cocktail affiché
                Trouver le bon cocktail parmi plusieurs propositions en fonction de l'ingrédient affiché           
            */}
            Start Quiz
            soit il faut trouver le bon ingrédient ou le bon cocktail
            C'est en 5 manches
            On a le résuttat à la fin avec les bonnes réponses en mode controle caliap
            <button onClick={handleGoToNextCocktail}>
                Start
            </button>
        </div>
    );
}

export default Quiz;