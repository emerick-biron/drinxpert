import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Search from './pages/Search';
import Quiz from './pages/Quiz';    
import Random from './pages/Random';
import './styles/app.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/random" element={<Random />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
