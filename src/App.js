import React, { Component } from 'react';
import './App.css';

const katakana = [
  {symbol: "ア", value: "a", row: 1, column: 1},
  {symbol: "イ", value: "i", row: 1, column: 2},
  {symbol: "ウ", value: "u", row: 1, column: 3},
  {symbol: "エ", value: "e", row: 1, column: 4},
  {symbol: "オ", value: "o", row: 1, column: 5},
  {symbol: "カ", value: "ka", row: 2, column: 1},
  {symbol: "キ", value: "ki", row: 2, column: 2},
  {symbol: "ク", value: "ku", row: 2, column: 3},
  {symbol: "ケ", value: "ke", row: 2, column: 4},
  {symbol: "コ", value: "ko", row: 2, column: 5},
  {symbol: "サ", value: "sa", row: 3, column: 1},
  {symbol: "シ", value: "shi", row: 3, column: 2},
  {symbol: "ス", value: "su", row: 3, column: 3},
  {symbol: "セ", value: "se", row: 3, column: 4},
  {symbol: "ソ", value: "so", row: 3, column: 5},
  {symbol: "タ", value: "ta", row: 4, column: 1},
  {symbol: "チ", value: "chi", row: 4, column: 2},
  {symbol: "ツ", value: "tsu", row: 4, column: 3},
  {symbol: "テ", value: "te", row: 4, column: 4},
  {symbol: "ト", value: "to", row: 4, column: 5},
  {symbol: "ナ", value: "na", row: 5, column: 1},
  {symbol: "ニ", value: "ni", row: 5, column: 2},
  {symbol: "ヌ", value: "nu", row: 5, column: 3},
  {symbol: "ネ", value: "ne", row: 5, column: 4},
  {symbol: "ノ", value: "no", row: 5, column: 5},
  {symbol: "ハ", value: "ha", row: 6, column: 1},
  {symbol: "ヒ", value: "hi", row: 6, column: 2},
  {symbol: "フ", value: "fu", row: 6, column: 3},
  {symbol: "ヘ", value: "he", row: 6, column: 4},
  {symbol: "ホ", value: "ho", row: 6, column: 5},
];

const hiragana = [
  {symbol: "あ", value: "a", position: [1,1]},
  {symbol: "い", value: "i", position: [2,1]},
  {symbol: "う", value: "u", position: [3,1]},
  {symbol: "え", value: "e", position: [4,1]},
  {symbol: "お", value: "o", position: [5,1]},
];

const allKana = [].concat(katakana, hiragana);

function symbols(showWhat) {
  return showWhat === 'both' ? allKana :
        (showWhat === 'katakana' ? katakana : hiragana);
}

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
      currentKana: katakana[0],
      answerCorrect: undefined,
      numCorrect: 0,
      numWrong: 0,
      showWhat: "both",
    }
  }

  pickSymbol() {
    let allKanaShown = symbols(this.state.showWhat);
    let oldKana = this.state.currentKana;
    let randomKana = oldKana;
    while (randomKana == this.state.currentKana) {
      randomKana = allKanaShown[Math.floor(Math.random() * allKanaShown.length)];
    }
    this.setState({currentKana: randomKana});
  }

  /* Callback function */
  checkAnswer(answer) {
    //let syms = symbols(this.state.showWhat);
    //let realAnswer = syms[this.state.symbol];
    if (answer === this.state.currentKana.value) {
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
          <KanaInputArea kana={this.state.currentKana} 
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
 * kana: the kana symbol to be displayed
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
      this.props.onCheckAnswer(event.target.value.toLowerCase().trim());
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
          <div className="KanaDisplay-symbol">{this.props.kana.symbol}</div>
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

function groupKanaByRow(kana) {
  let rows = [], currentRow = [], row = 1;
  kana.map(item => {
    if (item.row === row) {
      currentRow.push(item);
    } else {
      rows.push(currentRow);
      currentRow = [item];
      row = item.row;
    }
  });
  if (currentRow.length > 0) rows.push(currentRow);
  return rows;
}

/* Displays a katakana or hiragana table.
   Props:
   kana: either the katakana or hiragana array
*/
class KanaTable extends Component {
  render() {
    let kanaRows = groupKanaByRow(this.props.kana);
    return (
      <div className="KanaTable">
        <table>
          <tbody>
            {kanaRows.map(row => 
              <tr>
                {row.map(kana =>
                  <td><KanaSymbol kana={kana} /></td>
                )}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

class KatakanaTable extends Component {
  render() {
    return <KanaTable kana={katakana} />
  }
}

class HiraganaTable extends Component {
  render() {
    return <KanaTable kana={hiragana} />
  }
}

/* Display a kana symbol in the table.
   Props:
   kana: the kana object to be displayed (with keys "symbol" and "value")
*/
class KanaSymbol extends Component {
  render() {
    return (
      <div className="KanaSymbol">
        <div className="KanaSymbol-symbol">{this.props.kana.symbol}</div>
        <div className="KanaSymbol-value">{this.props.kana.value}</div>
      </div>
    )
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
          <h1 className="App-title">Learn Kana! <span className="smiley">ツ</span></h1>
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
