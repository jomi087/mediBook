import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AppContextProvider } from './context/AppContextProvider.jsx';
import { AuthContextProvider } from './context/AuthContextProvider.jsx';

createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </AuthContextProvider>
);
