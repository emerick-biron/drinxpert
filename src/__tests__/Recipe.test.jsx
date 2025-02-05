import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Recipe from "../pages/Recipe";
import useRecipe from "../api/useRecipe";

jest.mock("../api/useRecipe");

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({ search: "?id=11007" }),
    useNavigate: () => mockNavigate,
}));

test("renders loading state", () => {
    useRecipe.mockReturnValue({ recipe: null, loading: true, error: null });

    render(
        <MemoryRouter>
            <Recipe />
        </MemoryRouter>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});

test("renders error state", () => {
    useRecipe.mockReturnValue({ recipe: null, loading: false, error: "Error fetching recipe" });

    render(
        <MemoryRouter>
            <Recipe />
        </MemoryRouter>
    );

    expect(screen.getByText(/Error fetching recipe/i)).toBeInTheDocument();
});

test("renders no recipe found state", () => {
    useRecipe.mockReturnValue({ recipe: null, loading: false, error: null });

    render(
        <MemoryRouter>
            <Recipe />
        </MemoryRouter>
    );

    expect(screen.getByText(/Cocktail non trouvé/i)).toBeInTheDocument();
});

test("renders recipe details", () => {
    useRecipe.mockReturnValue({
        recipe: {
            strDrink: "Margarita",
            strDrinkThumb: "image.jpg",
            ingredients: [
                { name: "Tequila", measure: "1 1/2 oz", image: "tequila.png" },
                { name: "Triple sec", measure: "1/2 oz", image: "triplesec.png" },
            ],
            strInstructions: "Shake well and serve.",
        },
        loading: false,
        error: null,
    });

    render(
        <MemoryRouter>
            <Recipe />
        </MemoryRouter>
    );

    expect(screen.getByText("Margarita")).toBeInTheDocument();
    expect(screen.getByAltText("Margarita")).toBeInTheDocument();
    expect(screen.getByText("Tequila")).toBeInTheDocument();
    expect(screen.getByText("1 1/2 oz")).toBeInTheDocument();
    expect(screen.getByText("Triple sec")).toBeInTheDocument();
    expect(screen.getByText("1/2 oz")).toBeInTheDocument();
    expect(screen.getByText("Shake well and serve.")).toBeInTheDocument();
});

test("navigates back when back button is clicked", () => {
    useRecipe.mockReturnValue({
        recipe: {
            strDrink: "Margarita",
            strDrinkThumb: "image.jpg",
            ingredients: [],
            strInstructions: "",
        },
        loading: false,
        error: null,
    });

    render(
        <MemoryRouter>
            <Recipe />
        </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button"));

    expect(mockNavigate).toHaveBeenCalledWith(-1);
});
