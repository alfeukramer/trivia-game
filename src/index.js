import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import Games from './Pages/Games';
import Feedback from './Pages/Feedback';
import Settings from './Pages/Settings';
import store from './redux/store';
import Ranking from './Pages/Ranking';

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ App } />
        <Route path="/settings" component={ Settings } />
        <Route path="/game" component={ Games } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
      </Switch>
    </BrowserRouter>
  </Provider>,

  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
