import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppContext from './hooks';

import Routes from './routes';

import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <Router>
    <AppContext>
      <Routes />
    </AppContext>
    <GlobalStyle />
  </Router>
);

export default App;
