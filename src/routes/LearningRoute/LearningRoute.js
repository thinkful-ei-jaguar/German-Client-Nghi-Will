import React, { Component } from "react";
import { Input, Label, Required } from "../../components/Form/Form";
import DataService from "../../services/data-api-service";
import UserContext from "../../contexts/UserContext";

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
      nextWord
    } = this.state.currentWord;

    return (
      <section className="learning-word-section">
        <h2>
          Translate the word: <span>{nextWord}</span>
        </h2>
        <p>Your total score is: {totalScore}</p>

        <form onSubmit={this.handleSubmit}>
          <Label htmlFor="learn-guess-input">
            What's the translation for this word?
            <Required />
          </Label>
          <Input
            id="learn-guess-input"
            type="text"
            placeholder="Answer here"
            onChange={this.updateGuess}
            required
          />
          <button type="submit">Check</button>
        </form>

        <p>You have answered this word correctly {wordCorrectCount} times.</p>
        <p>
          You have answered this word incorrectly {wordIncorrectCount} times.
        </p>
      </section>
    );
  }
}

export default LearningRoute;
