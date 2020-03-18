import React, { Component } from "react";
import { Textarea } from "../../components/Form/Form";
import DataService from "../../services/data-api-service";
import UserContext from "../../contexts/UserContext";
import "./LearningRoute.css";

class LearningRoute extends Component {
  static ContextType = UserContext;

  state = {
    currentWord: {},
    isCorrect: false,
    guess: ""
  };

  componentDidMount() {
    DataService.getWord().then(word => this.setState({ currentWord: word }));
  }

  handleSubmit = ev => {
    ev.preventDefault();

    const { guess } = this.state;
    DataService.postGuess(guess)
      .then(response => {
        this.context.setGuess(response);
      })
      .then(this.props.history.push("/Results"));
  };

  updateGuess = ev => {
    this.setState({ guess: ev.currentTarget.value });
  };

  render() {
    const {
      wordCorrectCount,
      wordIncorrectCount,
      totalScore,
      currentWord
    } = this.state.currentWord;

    return (
      <section className="learning-word-section">
        <div className="learning-heading">
          <h2>
            Translate this word
            <span className="currentWord">{currentWord}</span>
          </h2>
        </div>
        <form onSubmit={this.handleSubmit}>
          <Textarea
            id="learn-guess-input"
            type="text"
            placeholder="Answer here"
            onChange={this.updateGuess}
            required
          />
          <button type="submit" className="check_button">
            Check
          </button>
        </form>
        <div className="score_container">
          <p className="total_score">Total score: {totalScore}</p>
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
