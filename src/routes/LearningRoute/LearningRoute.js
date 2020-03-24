import React, { Component } from "react";
import { Textarea } from "../../components/Form/Form";
import DataService from "../../services/data-api-service";
import "./LearningRoute.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class LearningRoute extends Component {
  state = {
    guess: "",
    word: {},
    nextWord: null
  };

  componentDidMount() {
    DataService.getFirstWord().then(data => {
      this.setState({ word: data });
    });
  }

  renderFeedBack = () => {
    return this.state.nextWord.isCorrect ? (
      <>
        <FontAwesomeIcon id="check_icon" icon="check-circle" />
        Correct
      </>
    ) : (
      <>
        <FontAwesomeIcon id="times_icon" icon="times-circle" />
        The correct translation was:
        <br />
        {this.state.nextWord.answer}
      </>
    );
  };

  renderButton = () => {
    return this.state.nextWord === null ? (
      <button
        type="button"
        id="check_button"
        onClick={() => this.handleSubmitAnswer()}
      >
        Check
      </button>
    ) : (
      <button
        type="button"
        id="next_button"
        onClick={() => this.handleNextButton()}
      >
        Next Word
      </button>
    );
  };

  handleSubmitAnswer = () => {
    // Ensure an entry is submitted
    if (this.state.guess.length) {
      // Check answer
      DataService.postGuess({ guess: this.state.guess.trim() }).then(data => {
        this.setState({ nextWord: data });

        // Update score
        if (this.state.nextWord.isCorrect) {
          this.setState({
            word: {
              ...this.state.word,
              wordCorrectCount: this.state.word.wordCorrectCount + 1,
              totalScore: this.state.word.totalScore + 1
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
    } else {
      alert(`Please translate: ${this.state.word.nextWord}`);
    }
  };

  handleNextButton = () => {
    // Update next word
    this.setState({
      word: this.state.nextWord,
      nextWord: null,
      guess: ""
    });
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
            <span className="currentWord" lang="de">
              {nextWord}
            </span>
          </h2>
        </div>
        <form>
          <Textarea
            id="learn-guess-input"
            type="text"
            placeholder="Answer here"
            onChange={this.updateGuess}
            value={this.state.guess}
            required
            disabled={this.state.nextWord && true}
          ></Textarea>
          {this.state.nextWord && (
            <p className="answer_feedback">{this.renderFeedBack()}</p>
          )}
          {this.renderButton()}
        </form>
        <div className="score_container">
          <p className="total_score">Total Score: {totalScore}</p>
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
