import React, { Component } from "react";
import { Textarea } from "../../components/Form/Form";
import DataService from "../../services/data-api-service";
import UserContext from "../../contexts/UserContext";
import "./LearningRoute.css";

class LearningRoute extends Component {
    static contextType = UserContext;
   
  state={
      userGuess: '',
      results: {}
  };
 
  
  componentDidMount() {
      DataService.getWord()
          .then(results => {
              this.setState({results})
          
          })
  }
    
   handleChange = (e) => {
        this.setState({
            userGuess: e.target.value
        })
    }
    handleSubmitGuess(event) {
        event.preventDefault();
        console.log('Posting guess')
    
        DataService.postGuess(this.state.userGuess)
            .then(data => {
            
                this.context.updateNextWord(data.nextWord);
                this.context.updateWordCorrectCount( data.wordCorrectCount);
                this.context.updateWordIncorrectCount(data.wordIncorrectCount);
                this.context.setCurrentWord (data.nextWord);
                this.context.updateTotalScore (data.totalScore);
                this.context.updateAnswer (data.answer);
                this.context.updateIsCorrect (data.isCorrect);
                this.context.setGuess( data.guess);
                console.log({'data:': data})
            })
        .catch(err => this.context.setError(err))
        
};
  
  
  

  render() {
    const {
      wordCorrectCount,
      wordIncorrectCount,
      totalScore,
      currentWord
    } = this.context;
   
        return (
            <section className="learning-word-section">s
                <div className="learning-heading">
                    <h2>
                        Translate this word
            <span className="currentWord">{currentWord.original}</span>
                    </h2>
                </div>
        <form onSubmit={this.handleSubmitGuess}>
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
