import { useState, useEffect } from "react";
import { useGetRandomCocktail } from "../api/Quiz";
import QuizCard from "../components/Quiz/QuizCard";
import "./../styles/Quiz.css";

const Quiz = () => {
    const [nextCocktail, setNextCocktail] = useState(0);
    const [cocktail, setCocktail] = useState(null);

    const getRandomCocktail = useGetRandomCocktail();

    useEffect(() => {
        console.log("useEffect");
        getRandomCocktail.then((cocktail) => {
            setCocktail(cocktail);
        });
    }, [nextCocktail]);

    const handleGoToNextCocktail = () => {
        console.log("handleGoToNextCocktail");
        setNextCocktail(nextCocktail + 1);
    };

    return (
        <div className="quiz-container">
            <div className="card-wrapper">
                <QuizCard key={nextCocktail} cocktail={cocktail} />
                <div className={"next-button-wrapper"}>
                    <button className="next-button" onClick={handleGoToNextCocktail}>
                        Next 🍹
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Quiz;
