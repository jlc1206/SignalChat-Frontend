import React from 'react';
import logo from '../logo.svg';
import './Home.css';

export default class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Wassup world?
          </p>
        </header>
      </div>
    );
  }
};
