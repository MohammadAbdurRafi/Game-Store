import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import AddGame from './pages/AddGame';
import EditGame from './pages/EditGame';
import Register from './pages/Register';
import Login from './pages/Login';
import Users from './pages/Users';
import ForgotPassword from './pages/ForgotPassword';
import { AuthProvider } from './context/auth.jsx';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/add" element={<AddGame />} />
          <Route path="/game/edit/:id" element={<EditGame />} />
          <Route path="/user/register" element={<Register />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
