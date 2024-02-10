import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RecipesContextProvider } from './context/RecipeContext';
import { AuthContextProvider } from './context/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <RecipesContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </RecipesContextProvider>

  </React.StrictMode>
);
