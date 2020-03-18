import React, { Component } from "react";
import { Textarea } from "../../components/Form/Form";
import DataService from "../../services/data-api-service";
import LearningContext from "../../contexts/LearningContext";
import "./LearningRoute.css";

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
            value={guess}
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
