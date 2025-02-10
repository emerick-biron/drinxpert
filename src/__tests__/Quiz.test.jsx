import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Quiz from "../pages/Quiz";
import { useGetRandomCocktail } from "../api/Quiz";

jest.mock("../api/Quiz", () => ({
    useGetRandomCocktail: jest.fn(),
}));

jest.mock("../components/Quiz/QuizCard", () => ({ cocktail }) => (
    <div data-testid="quiz-card">
        {cocktail ? cocktail.name : "No cocktail"}
    </div>
));

describe("Quiz component", () => {
    const mockCocktail1 = { name: "Mojito" };
    const mockCocktail2 = { name: "Martini" };

    beforeEach(() => {
        useGetRandomCocktail.mockClear();
    });

    test("renders QuizCard with fetched cocktail and updates on next click", async () => {
        let resolveCocktail1;
        const cocktailPromise1 = new Promise((resolve) => {
            resolveCocktail1 = resolve;
        });
        useGetRandomCocktail.mockReturnValue(cocktailPromise1);

        render(<Quiz />);

        expect(screen.getByTestId("quiz-card")).toHaveTextContent("No cocktail");

        resolveCocktail1(mockCocktail1);

        await waitFor(() =>
            expect(screen.getByTestId("quiz-card")).toHaveTextContent("Mojito")
        );

        let resolveCocktail2;
        const cocktailPromise2 = new Promise((resolve) => {
            resolveCocktail2 = resolve;
        });
        useGetRandomCocktail.mockReturnValue(cocktailPromise2);

        fireEvent.click(screen.getByText("Next 🍹"));

        expect(screen.getByTestId("quiz-card")).toHaveTextContent("Mojito");

        resolveCocktail2(mockCocktail2);

        await waitFor(() =>
            expect(screen.getByTestId("quiz-card")).toHaveTextContent("Martini")
        );
    });
});
