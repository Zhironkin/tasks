import React from 'react';
import ReactDOM from 'react-dom';
import { ContextProvider } from './controllers/context';

import './css/index.scss';
import App from './App';

ReactDOM.render(
  <ContextProvider>
    <App />
  </ContextProvider>,
  document.getElementById('root')
);

