import React, { Component } from "react";
import { Input, Label, Required } from "../../components/Form/Form";
import DataService from "../../services/data-api-service";
import LearningContext from "../../contexts/LearningContext";

class LearningRoute extends Component {
  static contextType = LearningContext;
    constructor(props) {
        super(props);
       
        this.state = {
            nextWord: '',
            currentWord: '',
            wordCorrectCount: null,
            totalScore: null,
            wordIncorrectCount: null,
            isCorrect: false,
            guess: '',
            
        };
        this.handleSubmitGuess = this.handleSubmitGuess.bind(this);
        this.updateGuess = this.updateGuess.bind(this);
    }
  componentDidMount() {
     
         DataService.getWord()
          .then(data => {
              this.setState({
                  currentWord: data.currentWord,
                  wordCorrectCount:data.wordCorrectCount,
                  totalScore: data.totalScore,
                  wordIncorrectCount: data.wordIncorrectCount,
                  nextWord: data.nextWord
              })
             
  
    })
  };
  
updateGuess(event) {
      
      this.setState({
          guess: event.target.value
          });
  };
  
  
  handleSubmitGuess(event) {
    event.preventDefault();
    const guess  = this.state.guess;
 
    DataService.postGuess(guess)
        .then(data => {
            this.setState({
                nextWord: data.nextWord,
                wordCorrectCount: data.wordCorrectCount,
                wordIncorrectCount:data.wordIncorrectCount,
                currentWord: data.currentWord,
                totalScore: data.totalScore,
                answer: data.answer,
                isCorrect: data.isCorrect,
                guess: data.guess
            })
      })
      
};
  
  
  

  
  render() {
      console.log(this.state)
    const {
          currentWord,
      wordCorrectCount,
      wordIncorrectCount,
      totalScore,
      guess
    } = this.state;

    return (
      <section className="learning-word-section">
        <h2>
          Translate the word: <span>{currentWord}</span>
        </h2>
        <p>Your total score is: {totalScore}</p>

        <form onSubmit={this.handleSubmitGuess}>
          <Label htmlFor="learn-guess-input">
            What's the translation for this word?
            <Required />
          </Label>
          <Input
            id="learn-guess-input"
            type="text"
            placeholder="Answer here"
            onChange={this.updateGuess}
            value={guess}
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
