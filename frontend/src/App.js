import React, { Component } from 'react';

import createBrowserHistory from 'history/createBrowserHistory';

import Navigation from './Navigation';
import Footer from './Footer';

import { Router, Route, Switch } from 'react-router-dom';

import Home from './Pages/Home';
import Test from './Pages/Test';
import About from './Pages/About';

const MainRoutes = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/test' component={Test}/>
      <Route path='/about' component={About}/>
    </Switch>
  </main>
);

export const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={history}>
          <div>
            <Navigation/>
            <MainRoutes/>
          </div>
        </Router>
        <Footer/>
      </div>
    );
  }
}

export default App;
