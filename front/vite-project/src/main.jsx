import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; 
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> {/* Se envuelve toda la aplicación en el provider con la store configurada */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
