import React from 'react';
import {Router, Route, hashHistory, browserHistory, IndexRoute} from 'react-router';
import Home from './Home';
import Login from './Login';
import App from './App.js';

export default function() {
    return (
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path='login' component={Login}/>
            </Route>
        </Router>
    )
}
