import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const katakana = {
  "ア": "a",
  "イ": "i",
  "ウ": "u",
  "エ": "e",
  "オ": "o",
};

class KanaDisplay extends Component {
  state = {symbol: "オ"}
  render() {
    return (
    <div className="KanaDisplay">
      <div className="KanaDisplay-symbol">{this.state.symbol}</div>
    </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Learn Kana ツ</h1>
        </header>
        <KanaDisplay />
      </div>
    );
  }
}

export default App;
