import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/navbar.css';

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm) {
            navigate(`/?query=${searchTerm}`);
        }
    };

    const handleRandom = async () => {
        try {
          const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");
          const data = await response.json();
          const randomCocktailId = data.drinks[0].idDrink;
          navigate(`/recipe?id=${randomCocktailId}`);
        } catch (error) {
          console.error("Error fetching random cocktail:", error);
        }
      };

    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/quiz"><i className="fas fa-award"></i></Link></li>
                <li><i onClick={handleRandom} className="fas fa-random" data-testid="random-button"></i></li>
            </ul>

            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search cocktail ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit"><i className="fas fa-search"></i></button>
            </form>
        </nav>
    );
};

export default Navbar;
