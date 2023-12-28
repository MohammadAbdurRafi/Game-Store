import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import AddGame from './pages/AddGame';
import EditGame from './pages/EditGame';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddGame />} />
        <Route path="/edit/:id" element={<EditGame />} />
      </Routes>
    </div>
  );
};

export default App;
