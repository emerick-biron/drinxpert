export const useGetRandomCocktail = async () => {
    try {
        const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");

        if (!response.ok) {
            throw new Error("Erreur lors de la récupération du cocktail");
        }

        const data = await response.json();
        const drink = data.drinks[0];

        if (!drink) return null;

        const ingredients = [];
        for (let i = 1; i <= 15; i++) {
            const ingredient = drink[`strIngredient${i}`];

            if (ingredient) {
                ingredients.push(ingredient);
            }
        }

        return {
            idDrink: drink.idDrink,
            strDrink: drink.strDrink,
            strDrinkThumb: drink.strDrinkThumb,
            ingredients,
        };
    } catch (error) {
        console.error("Erreur API:", error);
        return null;
    }
};