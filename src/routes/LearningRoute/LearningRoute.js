import React, { Component } from "react";
import { Textarea } from "../../components/Form/Form";
import DataService from "../../services/data-api-service";
import UserContext from "../../contexts/UserContext";
import "./LearningRoute.css";

class LearningRoute extends Component {
    static contextType = UserContext;
   
  state={
      nextWord: '',
      userGuess: '',
      guessSubmitted: false,
      wordCorrectCount: 0,
      wordIncorrectCount: 0,
      isCorrect: null
  }
 
  
  componentDidMount() {
      DataService.getWord()
          .then(results => {
              this.context.setTotalScore(results.totalScore)
              this.context.setCurrentWord(results)
              this.context.resetNextWord(results.nextWord)
          }).then(() => {
              this.setState({
                  nextWord: this.context.currentWord.nextWord,
                  wordCorrectCount: this.context.currentWord.wordCorrectCount,
                  wordIncorrectCount: this.context.currentWord.wordIncorrectCount,
                  totalScore: this.context.currentWord.totalScore
              })
      })
  }
    
   handleChange = (e) => {
        this.setState({
            userGuess: e.target.value
        })
    };
  
  
  
    handleSubmitGuess(e) {
        e.preventDefault();
        console.log('Posting guess')
        const guessSubmit = this.state.userGuess;
        this.setState({
            userGuess: '',
            userSubmitted: true
        });
        
        DataService.postGuess({guess: this.state.guess})
            .then(result => {
                this.context.resetAnswer(result.answer);
                this.context.setTotalScore(result.totalScore);
                this.context.resetWordCorrectCount(result.wordCorrectCount);
                this.context.resetWordIncorrectCount(result.wordIncorrectCount);
                this.context.resetIsCorrect(result.isCorrect);
                this.setState({nextWord: result.nextWord});
                if(result.isCorrect) {
                    this.setState({
                        wordCorrectScore: this.state.correctScore + 1}
                    )
                }
                else {
                    this.setState({wordIncorrectScore: this.state.wordIncorrectScore + 1})
                }
            })
    }
    
    
    
    
    
    render() {
    const {
     
      wordCorrectCount,
      wordIncorrectCount,
      totalScore,
      currentWord
    } = this.context;
   const { results } = this.state
        return (
            <section className="learning-word-section">
                <div className="learning-heading">
                    <h2>
                        Translate this word
            <span className="currentWord">{currentWord.original}</span>
                    </h2>
                </div>
        <form onSubmit={() => this.handleSubmitGuess}>
                    <Textarea
                        id="learn-guess-input"
                        type="text"
                        placeholder="Answer here"
                        onChange={this.handleChange}
                        value={this.state.userGuess}
                        required
                    />
          <button type="submit" className="check_button">Check</button>
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
