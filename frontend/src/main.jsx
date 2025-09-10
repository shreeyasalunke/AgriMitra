import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// In your main entry file (e.g., index.js or App.jsx)
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './component/State/store.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
   <Provider store={store}>
    <App />
    </Provider>
    </BrowserRouter>
  </StrictMode>,
)
