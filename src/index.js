import React from 'react';
import { createRoot } from 'react-dom/client'; // Змінив імпорт
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './reducers/store';
import App from './components/App';
import './index.css';  

const root = createRoot(document.getElementById('root'));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);