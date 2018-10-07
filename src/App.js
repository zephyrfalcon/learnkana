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
    this.checkAnswer = this.checkAnswer.bind(this);

    this.state = {
      symbol: 'ア',
    }
  }

  pickSymbol() {
    let keys = Object.keys(katakana);
    let randomKey = keys[keys.length * Math.random() << 0];
    this.setState({symbol: randomKey});
  }

  checkAnswer(answer) {
    alert("Checking your answer... " + answer)
  }

  render() {
    return (
      <div className="KanaLearning">
        <div className="KanaLearningLeft">
          <KanaInputArea symbol={this.state.symbol} onCheckAnswer={this.checkAnswer} />
        </div>
        <div className="KanaLearningRight">
          <div>score</div>
          <div>options</div>
          <div>info etc</div>
        </div>
      </div>
    )
  }
}

/* props:
 * symbol: the kana symbol to be displayed
 * onCheckAnswer(answer): callback to check the answer when we press Enter
 */
class KanaInputArea extends Component {
  constructor(props) {
    super(props);
    this.handleEnter = this.handleEnter.bind(this);
  }
  handleEnter(event) {  
    if (event.keyCode === 13) {
      // use a callback method via props to check the answer
      this.props.onCheckAnswer(event.target.value);
    }
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
