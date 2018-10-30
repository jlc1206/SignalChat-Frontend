import React, { Component } from 'react';

import { Globals } from './globals';

import * as SignalR from '@aspnet/signalr';

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
  componentDidMount() {
    let connection = new SignalR.HubConnectionBuilder()
      .withUrl(Globals.apiUrl + "/chatHub")
      .build();

    connection.on("Hello", () => {document.getElementById('test').innerText = 'Hello';});

    connection.start()
      .then(() => connection.invoke("Hello"));
  }
  render() {
    return (
      <div className="App">
      <div id="test"></div>
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
