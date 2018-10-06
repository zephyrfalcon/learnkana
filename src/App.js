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
  render() {
    return (
      <div class="KanaLearning">
      <KanaLearningLeft />
      <KanaLearningRight />
    </div>
    )
  }
}

class KanaLearningLeft extends Component {
  render() {
    return (
      <div class="KanaLearningLeft">
        <KanaInputArea />
      </div>
    )
  }
}

class KanaLearningRight extends Component {
  render() {
    return (
      <div class="KanaLearningRight">
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
  }
  handleEnter(event) {  
    if (event.keyCode == 13) alert("You entered: " + event.target.value)
    // XXX I would like to access the text input by name, how do I do this?
  }
  render() {
    return (
      <div class="KanaInputArea">
        <KanaDisplay symbol="ア" />
        <input type="text" name="kana" maxlength="4" 
               class="KanaLearningLeft-input-text"
               onKeyUp={this.handleEnter}
        />
      </div>
    )
  }
}

class KanaDisplay extends Component {
  //state = {symbol: "オ"}
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
