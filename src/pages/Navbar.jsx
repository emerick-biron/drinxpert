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
                <li><Link to="/quiz">Quiz</Link></li>
                <li><Link to="/random">Random</Link></li>
            </ul>

            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search cocktails..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
        </nav>
    );
};

export default Navbar;
