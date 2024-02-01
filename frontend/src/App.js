import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      
      <BrowserRouter>
      <Navbar />
        <div className='pages'>
          <Routes>

            <Route
              path='/'
              element={user ? <Home /> : <Navigate to="/login" />}
              />

            <Route
              path='/signup'
              element={<Signup/>}
              />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;