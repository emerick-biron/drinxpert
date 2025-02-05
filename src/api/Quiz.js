//get random cocktail and its ingredients

export const useGetRandomCocktail = async () => {
    try {
        const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");

        if (!response.ok) {
            throw new Error("Erreur lors de la récupération du cocktail");
        }

        const data = await response.json();
        return data.drinks[0]; // Retourne un cocktail aléatoire
    } catch (error) {
        console.error("Erreur API:", error);
        return null;
    }
};


