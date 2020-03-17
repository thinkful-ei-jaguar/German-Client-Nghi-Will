import React, { Component } from "react";
import DataService from "../../services/data-api-service";

class LearningRoute extends Component {
  state = {
    currentWord: {},
    isCorrect: false
  };

  componentDidMount() {
    DataService.getNextWord().then(word =>
      this.setState({ currentWord: word })
    );
  }

  handleGuess = ev => {
    const guessInput = ev.target;

    if (guessInput === this.state.currentWord.translation) {
      const newCount = this.state.currentWord.correct_count + 1;
      this.setState({
        currentWord: {
          correct_count: newCount
        },
        isCorrect: true
      });
    } else {
      let newCount = this.state.currentWord.incorrect_count + 1;
      this.setState({
        currentWord: {
          incorrect_count: newCount
        }
      });
    }
  };

  render() {
    const {
      original,
      translation,
      correct_count,
      incorrect_count
    } = this.state.currentWord;
    return (
      <section className="learning-word-section">
        <h3>{original}</h3>
      </section>
    );
  }
}

export default LearningRoute;
