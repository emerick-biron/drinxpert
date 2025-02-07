# Drinxpert Documentation

## What is it?

**Drinxpert** is a web application built with **React** and **Vite** that allows users to search for cocktail recipes, take quizzes, and explore drink recommendations. The project uses `react-router-dom` for navigation and `fuse.js` for fuzzy searching.

## Services / Features

- 🔍 **Cocktail Search**: Search for cocktails by name or ingredients.
- 📜 **Cocktail Recipes**: View detailed recipes with ingredients and preparation instructions.
- 🎲 **Random Cocktail**: Get a random cocktail recommendation.

---

## How to Build

### Prerequisites

- **Node.js** 20+
- **npm** (comes with Node.js)
- **Docker** (optional for containerized deployment)

### Installation

```sh
git clone <https://github.com/your-repo/drinxpert.git>
cd drinxpert
npm install
```

### Build Process

```sh
npm run build
```

This will create a production-ready build inside the `dist/` folder.

---

## How to Test

### Running Unit Tests

Drinxpert uses **Jest** and **React Testing Library** for unit tests.

```sh
npm run test
```

This command will execute all Jest tests inside `./src/__tests__/`.

### Example Test Files

- `./src/__tests__/CocktailCard.test.jsx`
- `./src/__tests__/useRecipe.test.js`
- `./src/__tests__/Recipe.test.jsx`

---

## How to Run Locally

To run Drinxpert in development mode:

```sh
npm run dev
```

This will start the development server on `http://localhost:5173/`.

---

## How to Run with Docker

### Building the Docker Image

```sh
docker build -t drinxpert .
```

### Running the Container

```sh
docker run -p 8080:80 --name drinxpert -d drinxpert
```

The application will be accessible at `http://localhost:8080/`.