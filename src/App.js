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

class KanaLearning extends Component {
  constructor(props) {
    super(props);
    this.pickSymbol = this.pickSymbol.bind(this);

    this.state = {
      symbol: 'ア',
    }
  }

  pickSymbol() {
    let keys = Object.keys(katakana);
    let randomKey = keys[keys.length * Math.random() << 0];
    this.setState({symbol: randomKey});
  }

  render() {
    return (
      <div className="KanaLearning">
      <KanaLearningLeft symbol={this.state.symbol} />
      <KanaLearningRight />
    </div>
    )
  }
}

class KanaLearningLeft extends Component {
  render() {
    return (
      <div className="KanaLearningLeft">
        <KanaInputArea symbol={this.props.symbol} />
      </div>
    )
  }
}

class KanaLearningRight extends Component {
  render() {
    return (
      <div className="KanaLearningRight">
        <div>score</div>
        <div>options</div>
        <div>info etc</div>
      </div>
    )
  }
}

class KanaInputArea extends Component {
  constructor(props) {
    super(props);
    this.handleEnter = this.handleEnter.bind(this);
    this.checkInput = this.checkInput.bind(this);
  }
  checkInput(text) {
    // does the KanaInputArea need to check this, or should we do this
    // elsewhere? it needs to know the symbol and the text we entered.
    // currently the symbol is hardcoded, but in a real version it needs to be
    // passed down (via props I assume), by some object that generates these
    // randomly.
  }
  handleEnter(event) {  
    if (event.keyCode === 13) alert("You entered: " + event.target.value)
    // XXX I would like to access the text input by name, how do I do this?
    this.checkInput(event.target.value);
  }
  render() {
    return (
      <div className="KanaInputArea">
        <KanaDisplay symbol={this.props.symbol} />
        <input type="text" name="kana" maxlength="4" 
               className="KanaLearningLeft-input-text"
               onKeyUp={this.handleEnter}
        />
      </div>
    )
  }
}

class KanaDisplay extends Component {
  render() {
    return (
    <div className="KanaDisplay">
      <div className="KanaDisplay-symbol">{this.props.symbol}</div>
    </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Learn Kana! ツ</h1>
        </header>
      <KanaLearning />
      </div>
    );
  }
}

export default App;
