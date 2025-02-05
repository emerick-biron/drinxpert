import { renderHook, act, waitFor } from "@testing-library/react";
import useRecipe from "../api/useRecipe";

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () =>
            Promise.resolve({
                drinks: [
                    {
                        idDrink: "11007",
                        strDrink: "Margarita",
                        strDrinkThumb: "image.jpg",
                        strIngredient1: "Tequila",
                        strIngredient2: "Triple sec",
                        strIngredient3: "Lime juice",
                        strMeasure1: "1 1/2 oz",
                        strMeasure2: "1/2 oz",
                        strMeasure3: "1 oz",
                    },
                ],
            }),
    })
);

beforeEach(() => {
    jest.clearAllMocks();
});

test("fetches recipe successfully", async () => {
    const { result } = renderHook(() => useRecipe("11007"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.recipe).toMatchObject({
        idDrink: "11007",
        strDrink: "Margarita",
        strDrinkThumb: "image.jpg",
        ingredients: [
            { name: "Tequila", measure: "1 1/2 oz", image: "https://www.thecocktaildb.com/images/ingredients/Tequila.png" },
            { name: "Triple sec", measure: "1/2 oz", image: "https://www.thecocktaildb.com/images/ingredients/Triple sec.png" },
            { name: "Lime juice", measure: "1 oz", image: "https://www.thecocktaildb.com/images/ingredients/Lime juice.png" },
        ],
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
        "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007"
    );
});

test("handles missing recipe", async () => {
    global.fetch.mockResolvedValueOnce({
        json: () => Promise.resolve({ drinks: null }),
    });

    const { result } = renderHook(() => useRecipe("99999"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.recipe).toBe(null);
    expect(result.current.error).toBe(null);
});

test("handles API error", async () => {
    global.fetch.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useRecipe("11007"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.recipe).toBe(null);
    expect(result.current.error).toBe("Erreur lors de la récupération de la recette");
});
