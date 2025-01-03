import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Browse from './pages/Browse';
import MyStuff from './pages/MyStuff';
import Create from './pages/Create';



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
              path='/browse'
              element={user ? <Browse /> : <Navigate to="/login" />}
              />

            <Route 
              path='/mystuff'
              element={user ? <MyStuff /> : <Navigate to="/login" />}
              />

            <Route 
              path='/create'
              element={user ? <Create /> : <Navigate to="/login" />}
              />

            <Route
              path='/about'
              element={<About />}
              />

            <Route
              path='/signup'
              element={user ? <Navigate to="/" /> : <Signup />}
              />

            <Route
              path='/login'
              element={user ? <Navigate to="/" /> : <Login />}
              />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
