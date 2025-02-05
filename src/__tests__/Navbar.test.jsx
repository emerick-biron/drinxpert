import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../pages/Navbar";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

describe("Navbar", () => {
    let mockNavigate;

    beforeEach(() => {
        mockNavigate = jest.fn();
        require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);
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
});
