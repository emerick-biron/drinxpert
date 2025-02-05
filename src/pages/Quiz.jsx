import { useState, useEffect } from "react";
import { useGetRandomCocktail } from "../api/Quiz";
import QuizCard from "../components/Quiz/QuizCard";



const Quiz = () => {
    const [nextCocktail, setNextCocktail] = useState(0);
    const [cocktail, setCocktail] = useState(null);

    const getRandomCocktail = useGetRandomCocktail();

    useEffect(() => {
        getRandomCocktail.then((cocktail) => {
            console.log(cocktail.ingredients);
            setCocktail(cocktail);
        });
    }, [nextCocktail]);

    const handleGoToNextCocktail = () => {
        setNextCocktail(nextCocktail + 1);
    };

    return (
        <div>
            <QuizCard {...cocktail} />
            <button onClick={handleGoToNextCocktail}>
                Next
            </button>
        </div>
    );
}

export default Quiz;