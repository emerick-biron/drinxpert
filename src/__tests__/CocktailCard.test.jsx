import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import CocktailCard from "../components/CocktailCard";

const mockCocktail = {
    id: "11007",
    name: "Margarita",
    thumb: "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg"
};

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(() => jest.fn()),
}));

test("displays the cocktail name and image", () => {
    render(
        <CocktailCard cocktail={mockCocktail} />
    );

    expect(screen.getByText("Margarita")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", mockCocktail.thumb);
});

test("navigates to the correct URL on click", () => {
    const mockNavigate = jest.fn();
    jest.spyOn(require("react-router-dom"), "useNavigate").mockReturnValue(mockNavigate);

    render(
        <CocktailCard cocktail={mockCocktail} />
    );

    fireEvent.click(screen.getByText("Margarita"));
    expect(mockNavigate).toHaveBeenCalledWith(`/recipe?id=11007`);
});
