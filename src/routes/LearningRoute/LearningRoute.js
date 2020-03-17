import React, { Component } from "react";
import { Input, Label, Required } from "../../components/Form/Form";
import DataService from "../../services/data-api-service";
import UserContext from "../../contexts/UserContext";

class LearningRoute extends Component {
  static ContextType = UserContext;

  state = {
    currentWord: {},
    isCorrect: false
  };

  componentDidMount() {
    DataService.getWord().then(word => this.setState({ currentWord: word }));
  }

  handleSubmit = ev => {
    ev.preventDefault();
    const { guess } = ev.target;
    DataService.postGuess(guess.value)
      .then(response => {
        this.context.setGuess(response);
      })
      .then(this.props.history.push("/Results"));
  };

  render() {
    const {
      wordCorrectCount,
      wordIncorrectCount,
      totalScore,
      currentWord
    } = this.state.currentWord;
    console.log(this.state.currentWord);
    return (
      <section className="learning-word-section">
        <h2>
          Translate the word: <span>{currentWord}</span>
        </h2>
        <p>Your total score is: {totalScore}</p>

        <form>
          <Label htmlFor="learn-guess-input">
            What's the translation for this word?
            <Required />
          </Label>
          <Input
            id="learn-guess-input"
            type="text"
            onSubmit={this.handleSubmit}
            placeholder="Answer here"
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
