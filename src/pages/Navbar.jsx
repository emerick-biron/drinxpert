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

    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/quiz"><i className="fas fa-award"></i></Link></li>
                <li><Link to="/random"><i className="fas fa-random"></i></Link></li>
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
