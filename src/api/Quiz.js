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
        const secretIngredientName = ingredients[Math.floor(Math.random() * ingredients.length)];
        const secretIngredientPosition = ingredients.indexOf(secretIngredientName);

        ingredients[secretIngredientPosition] = "???";

        const missingIngredients = await useGetRandomIngredients(ingredients);

        const randomIndex = Math.floor(Math.random() * (missingIngredients.length + 1));
        missingIngredients.splice(randomIndex, 0, secretIngredientName);

        return {
            idDrink: drink.idDrink,
            strDrink: drink.strDrink,
            strDrinkThumb: drink.strDrinkThumb,
            ingredients,
            secretIngredientName: secretIngredientName,
            missingIngredients: missingIngredients
        };
    } catch (error) {
        console.error("Erreur API:", error);
        return null;
    }
};

export const useGetRandomIngredients = async (excludedIngredients = []) => {
    try {
        const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list");

        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des ingrédients");
        }

        const data = await response.json();
        let ingredients = data.drinks.map(drink => drink.strIngredient1);

        ingredients = ingredients.filter(
            ingredient => !excludedIngredients.includes(ingredient)
        );

        const randomIngredients = ingredients
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);

        return randomIngredients;
    } catch (error) {
        console.error("Erreur API:", error);
        return [];
    }
};