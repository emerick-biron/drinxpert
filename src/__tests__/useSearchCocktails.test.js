import { renderHook, act } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import useSearchCocktails from "../api/useSearchCocktails";

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () =>
            Promise.resolve({
                drinks: [{ idDrink: "11007", strDrink: "Margarita", strDrinkThumb: "image.jpg" }],
            }),
    })
);

beforeEach(() => {
    jest.clearAllMocks();
});

test("fetches cocktails from API", async () => {
    const { result } = renderHook(() => useSearchCocktails("Margarita"));

    await waitFor(() => {
        expect(result.current.cocktails).toEqual([
            { id: "11007", name: "Margarita", thumb: "image.jpg" },
        ]);
    });

    expect(global.fetch).toHaveBeenCalledWith(
        "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Margarita"
    );
});
