const QuizCard = ({idDrink, strDrink, strDrinkThumb, ingredients}) => {


    
    return (
        <>
            <div>
                <h1>{strDrink}</h1>
                <img src={strDrinkThumb} alt={strDrink} />
                <ul>
                    {ingredients.map((ingredient) => (
                        <li key={ingredient}>{ingredient}</li>
                    ))}
                </ul>
            </div>
        
        </>
    )

}

export default QuizCard;