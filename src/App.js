import React, { Component } from 'react';
import './App.css';

const katakana = {
  "ア": "a",
  "イ": "i",
  "ウ": "u",
  "エ": "e",
  "オ": "o",
};

const hiragana = {
  "あ": "a",
  "い": "i",
  "う": "u",
  "え": "e",
  "お": "o",
};

const allKana = Object.assign({}, katakana, hiragana);

// save the scores and options here so we don't lose them when we click on
// another tab
let savedState = undefined;

class KanaLearning extends Component {
  constructor(props) {
    super(props);

    // bind skulduggery
    this.pickSymbol = this.pickSymbol.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.nextRound = this.nextRound.bind(this);
    this.setOption = this.setOption.bind(this);

    this.state = savedState || {
      symbol: 'ア',
      answerCorrect: undefined,
      numCorrect: 0,
      numWrong: 0,
      showWhat: "both",
    }
  }

  pickSymbol() {
    let oldSymbol = this.state.symbol;
    let symbols = this.state.showWhat === 'both' ? allKana :
                 (this.state.showWhat === 'katakana' ? katakana : hiragana);
    let keys = Object.keys(symbols);

    let randomKey = oldSymbol;
    // pick a new random symbol; make sure it's not the same as the previous
    // one
    while (randomKey === this.state.symbol) {
      randomKey = keys[keys.length * Math.random() << 0];
    }
    this.setState({symbol: randomKey});
  }

  /* Callback function */
  checkAnswer(answer) {
    let realAnswer = katakana[this.state.symbol];
    if (answer === realAnswer) {
      this.setState({answerCorrect: true, numCorrect: this.state.numCorrect+1});
    } else {
      this.setState({answerCorrect: false, numWrong: this.state.numWrong+1});
    }
    this.nextRound();
  }

  nextRound() {
    setTimeout(() => {
      this.pickSymbol()
      this.setState({answerCorrect: undefined})
      savedState = this.state;
      }, 1000);
  }

  setOption(showWhat) {
    this.setState({showWhat: showWhat});
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
          <table className="KanaLearningRight-results">
            <tbody>
              <tr>
                <td colspan="2">Results</td>
              </tr>
              <tr>
                <td>Number of kana tried:</td>
                <td>{this.state.numCorrect + this.state.numWrong}</td>
              </tr>
              <tr>
                <td>Correct answers:</td>
                <td>{this.state.numCorrect}</td>
              </tr>
              <tr>
                <td>Wrong answers:</td>
                <td>{this.state.numWrong}</td>
              </tr>
            </tbody>
          </table>
          <div className="KanaLearningRight-options">
            <div><input type="radio" name="show-what" value="katakana" onClick={() => this.setOption("katakana")} /> only show katakana</div>
            <div><input type="radio" name="show-what" value="hiragana" onClick={() => this.setOption("hiragana")} /> only show hiragana</div>
            <div><input type="radio" name="show-what" value="both" onClick={() => this.setOption("both")} /> show both</div>
          </div>
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

    this.inputBox = React.createRef();
  }

  handleEnter(event) {  
    if (event.keyCode === 13) {
      // use a callback method via props to check the answer
      this.props.onCheckAnswer(event.target.value.trim());
    }
  }

  answerMessage(correct) {
    if (correct === undefined) return "";
    return correct ? "CORRECT" : "WRONG";
  }

  render() {
    // this is a bit of a hack... if we currently don't have an answer (i.e. it's
    // undefined), which should only happen when we first start the app or when a
    // previous answer is cleared, then clear the input text box.
    // XXX think of a better way to do this.
    if (this.props.answerCorrect === undefined) {
      if (this.inputBox.current) this.inputBox.current.value = "";
    }

    // used to determine the name of the CSS class for the answer
    let answerstr = this.props.answerCorrect === undefined ? "empty" : (this.props.answerCorrect ? "correct" : "wrong");

    return (
      <div className="KanaInputArea">
        <div className="KanaDisplay">
          <div className="KanaDisplay-symbol">{this.props.symbol}</div>
        </div>
        <input ref={this.inputBox} type="text" name="kana" maxlength="4" 
               className="KanaLearningLeft-input-text"
               onKeyUp={this.handleEnter}
        />
        <div className={"KanaInputArea-answer KanaInputArea-answer-"+answerstr}>
          {this.answerMessage(this.props.answerCorrect)}
        </div>
      </div>
    )
  }
}

class Instructions extends Component {
  render() {
    return <p>Instructions</p>
  }
}

class KatakanaTable extends Component {
  render() {
    return <p>TODO: katakana table</p>
  }
}

class HiraganaTable extends Component {
  render() {
    return <p>TODO: hiragana table</p>
  }
}


class App extends Component {
  constructor(props) {
    super(props);
    this.setTab = this.setTab.bind(this);

    this.state = {
      component: KanaLearning,
    };
  }

  setTab(component) {
    this.setState({component: component});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Learn Kana! ツ</h1>
        </header>
        <div className="LearnKana-Tabs">
          <span onClick={() => this.setTab(KanaLearning)}>Training</span>
          <span onClick={() => this.setTab(KatakanaTable)}>Katakana Table</span>
          <span onClick={() => this.setTab(HiraganaTable)}>Hiragana Table</span>
          <span onClick={() => this.setTab(Instructions)}>Instructions</span>
        </div>
        <div className="LearnKana-main">
          <this.state.component />
        </div>
      </div>
    );
  }
}

export default App;
