import React, { Component } from "react";
import { Textarea } from "../../components/Form/Form";
import DataService from "../../services/data-api-service";
import UserContext from "../../contexts/UserContext";
import "./LearningRoute.css";

class LearningRoute extends Component {
  static contextType = UserContext;

  state = {
    guess: "",
    word: {},
    nextWord: {},
    answered: false
  };

  componentDidMount() {
    DataService.getHeadWord().then(data => {
      this.setState({ word: data });
    });
  }

  renderFeedBack = () => {
    console.log(this.state);
    return this.context.isCorrect ? (
      <>
        <h3>Correct! :D</h3>
        <p>
          The correct translation for {this.state.word.nextWord} was{" "}
          {this.state.nextWord.answer}!
        </p>
      </>
    ) : (
      <>
        <h3>Good try, but not quite right.</h3>
        <p>
          The correct translation for {this.state.word.nextWord} was{" "}
          {this.state.nextWord.answer}!
        </p>
      </>
    );
  };

  renderButton = () => {
    return this.state.answered === false ? (
      <button type="submit" id="check_button">
        Check
      </button>
    ) : (
      <button id="next-button" onClick={() => this.handleNextButton}>
        Try another word!
      </button>
    );
  };

  handleSubmitAnswer = e => {
    e.preventDefault();
    // Check answer
    DataService.postGuess({ guess: this.state.guess }).then(data => {
      // nextWord: "Backpfeifengesicht"
      // wordCorrectCount: 0
      // wordIncorrectCount: 4
      // totalScore: 0
      // answer: "Tired of life"
      // isCorrect: false

      //   this.context.setWordCorrectCount(data.wordCorrectCount);
      //   this.context.setWordIncorrectCount(data.wordIncorrectCount);
      //   this.context.setTotalScore(data.totalScore);
      //   this.context.setAnswer(data.answer);
      //   this.context.setIsCorrect(data.isCorrect);
      this.setState({ nextWord: data });
      //   this.setState({ nextWord: data.nextWord });

      if (this.state.nextWord.isCorrect) {
        this.setState({
          word: {
            ...this.state.word,
            wordCorrectCount: this.state.word.wordCorrectCount + 1
          }
        });
      } else {
        this.setState({
          word: {
            ...this.state.word,
            wordIncorrectCount: this.state.word.wordIncorrectCount + 1
          }
        });
      }
    });
    this.setState({
      answered: true
    });
  };

  handleNextButton = () => {
    this.setState({
      word: this.state.nextWord,
      nextWord: {},
      answered: false,
      guess: ""
    });

    // DataService.getHeadWord()
    //   .then(data => {
    //     this.context.setCurrentWord(data);
    //     this.context.setNextWord(data.nextWord);
    //   })
    //   .then(() => {
    //     this.setState({
    //       totalScore: this.context.currentWord.totalScore,
    //       wordCorrectCount: this.context.currentWord.wordCorrectCount,
    //       wordIncorrectCount: this.context.currentWord.wordIncorrectCount
    //     });
    //   });
  };

  updateGuess = e => {
    this.setState({
      guess: e.target.value
    });
  };

  render() {
    const {
      nextWord,
      wordCorrectCount,
      wordIncorrectCount,
      totalScore
    } = this.state.word;

    return (
      <section className="learning-word-section">
        <div className="learning-heading">
          <h2>
            Translate this word
            <span className="currentWord">{nextWord}</span>
          </h2>
        </div>
        {this.state.answered && (
          <div className="answerFeedback">{this.renderFeedBack()}</div>
        )}
        <form onSubmit={e => this.handleSubmitAnswer(e)}>
          <Textarea
            id="learn-guess-input"
            type="text"
            placeholder="Answer here"
            onChange={this.updateGuess}
            value={this.state.guess}
            required
          />
          {this.renderButton()}
        </form>
        <div className="Count_container">
          <p className="total_Count">Total Count: {totalScore}</p>
          <p className="correct_word_count">
            You have answered this word correctly {wordCorrectCount} times.
          </p>
          <p>
            You have answered this word incorrectly {wordIncorrectCount} times.
          </p>
        </div>
      </section>
    );
  }
}

export default LearningRoute;
