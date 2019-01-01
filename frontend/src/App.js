import React, { Component } from 'react';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import createBrowserHistory from 'history/createBrowserHistory';
import { Router, Route, Switch } from 'react-router-dom';

import Navigation from './Navigation';
import Footer from './Footer';

import { Globals } from './globals';

import Home from './Pages/Home';
import Test from './Pages/Test';
import About from './Pages/About';
import Login from './Pages/Login';
import Register from './Pages/Register';

import ChatApp from './redux/appReducer';
import { createSignalRMiddleware } from './redux/signalRMiddleware';
import { loginSuccess } from './redux/actions';

const initialState = {
  user: {
    isLoggedIn: Date.now() < localStorage.getItem("expires"),
    isLoggingIn: false,
    name: localStorage.getItem("userName"),
    email: localStorage.getItem("userName"),
    token: localStorage.getItem("token"),
    isRegistering: false,
    hasRegistered: false
  },
  messages:{},
  chatUsers: {}
};

const middleWares = [createSignalRMiddleware, thunkMiddleware];
// composeWithDevTools causes the login page to break.
export const store = createStore(ChatApp, initialState, applyMiddleware(...middleWares));

const MainRoutes = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/test' component={Test} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <Route path='/about' component={About} />
    </Switch>
  </main>
);

export const history = createBrowserHistory();

class App extends Component {
  componentDidMount() {
    if (Date.parse(localStorage.getItem('expires')) > Date.now()) {
      store.dispatch(loginSuccess({ userName: localStorage.getItem('userName'), access_token: localStorage.getItem('token') }));
    }
  }
  render() {
    return (
      <div className="App">
        <div id="test"></div>
        <Provider store={store}>
          <div>
            <Router history={history}>
              <div>
                <Navigation />
                <MainRoutes />
              </div>
            </Router>
            <Footer />
          </div>
        </Provider>
      </div>
    );
  }
}

export default App;
