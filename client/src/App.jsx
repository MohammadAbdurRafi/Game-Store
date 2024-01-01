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
        <Route path="/home" element={<Home />} />
        <Route path="/game/add" element={<AddGame />} />
        <Route path="/game/edit/:id" element={<EditGame />} />
      </Routes>
    </div>
  );
};

export default App;
