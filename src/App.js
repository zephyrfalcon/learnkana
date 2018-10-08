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
      answerCorrect: undefined,
    }
  }

  pickSymbol() {
    let oldSymbol = this.state.symbol;
    let keys = Object.keys(katakana);

    let randomKey = oldSymbol;
    // pick a new random symbol; make sure it's not the same as the previous
    // one
    while (randomKey === this.state.symbol) {
      randomKey = keys[keys.length * Math.random() << 0];
    }
    this.setState({symbol: randomKey});
  }

  checkAnswer(answer) {
    //alert("Checking your answer... " + answer)
    let realAnswer = katakana[this.state.symbol];
    if (answer === realAnswer) {
      alert("Correct!");
      // XXX instead of an alert, would like to wait a second or so, display
      // CORRECT below the input box (or wherever), then start the next round
      this.setState({answerCorrect: true});
      this.pickSymbol();
    } else {
      alert("no!");
      this.setState({answerCorrect: false});
    }
  }

  render() {
    return (
      <div className="KanaLearning">
        <div className="KanaLearningLeft">
          <KanaInputArea symbol={this.state.symbol} 
                         onCheckAnswer={this.checkAnswer} 
                         answerCorrect={this.state.answerCorrect}
          />
        </div>
        <div className="KanaLearningRight">
          <div>
            <div>Number of kana tried: ...</div>
            <div>Number of kana correct: ...</div>
            <div>Number of wrong answers: ...</div>
            <div>Percentage: ...</div>
          </div>
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
 * answerCorrect: true/false/undefined
   (I guess the idea is that KanaLearning knows whether the answer is wrong or 
   not, but KanaInputArea does/should not!)
 */
class KanaInputArea extends Component {

  constructor(props) {
    super(props);
    this.handleEnter = this.handleEnter.bind(this);
    this.answerMessage = this.answerMessage.bind(this);
  }

  handleEnter(event) {  
    if (event.keyCode === 13) {
      // use a callback method via props to check the answer
      this.props.onCheckAnswer(event.target.value);
    }
  }

  answerMessage(correct) {
    if (correct === undefined) return "";
    return correct ? "CORRECT" : "WRONG";
  }

  render() {
    return (
      <div className="KanaInputArea">
        <div className="KanaDisplay">
          <div className="KanaDisplay-symbol">{this.props.symbol}</div>
        </div>
        <input type="text" name="kana" maxlength="4" 
               className="KanaLearningLeft-input-text"
               onKeyUp={this.handleEnter}
        />
        <div class="KanaInputArea-answer">{this.answerMessage(this.props.answerCorrect)}</div>
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
