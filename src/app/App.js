import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from './helpers/history';
import HomePage from './main/pages/home/HomePage';
import Page404 from './main/pages/Page404';
import Login from './main/pages/login/Login';
import Resgister from './main/pages/register/Register';

function App() {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={HomePage}/> 
                <Route path="/signin" component={Login}/> 
                <Route path="/signup" component={Resgister}/> 
                <Route component={ Page404} />
            </Switch>
        </Router>
    );
}

export default App;
