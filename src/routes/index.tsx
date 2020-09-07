import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Import from '../pages/Import';
import PostTransaction from '../pages/Post';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={PostTransaction} />
    <Route path="/import" component={Import} />
    <Route path="/post" component={Dashboard} />
  </Switch>
);

export default Routes;
