import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../pages/Navbar";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () =>
            Promise.resolve({
                drinks: [{ idDrink: "12345" }],
            }),
    })
);

describe("Navbar", () => {
    let mockNavigate;

    beforeEach(() => {
        mockNavigate = jest.fn();
        require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("renders navigation links and search input", () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        expect(screen.getByPlaceholderText("Search cocktail ...")).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    test("navigates to the correct URL when searching", () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText("Search cocktail ..."), {
            target: { value: "Margarita" },
        });

        fireEvent.click(screen.getByRole("button"));

        expect(mockNavigate).toHaveBeenCalledWith(`/?query=Margarita`);
    });

    test("fetches and navigates to a random cocktail", async () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        const randomButton = screen.getByTestId("random-button")

        fireEvent.click(randomButton);

        await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for fetch to resolve

        expect(global.fetch).toHaveBeenCalledWith("https://www.thecocktaildb.com/api/json/v1/1/random.php");
        expect(mockNavigate).toHaveBeenCalledWith(`/recipe?id=12345`);
    });

    test("handles API error gracefully", async () => {
        global.fetch.mockImplementationOnce(() => Promise.reject("API is down"));

        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        const randomButton = screen.getByRole("button", { hidden: true });

        fireEvent.click(randomButton);

        await new Promise((resolve) => setTimeout(resolve, 100));

        expect(mockNavigate).not.toHaveBeenCalled();
    });
});
