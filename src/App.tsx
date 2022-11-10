import React, { Suspense } from 'react';
import { Spin } from 'antd';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './views/login';
import Register from './views/register';
import Home from './views/home';
import Initialization from './views/initialization';
import './App.css';
import './style/resetAntd.scss';

function App() {
  return (
    <Suspense>
      <Router>
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/home" component={Home} />
            <Route path="/initialization" component={Initialization} />
            <Redirect to="/initialization" />
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
