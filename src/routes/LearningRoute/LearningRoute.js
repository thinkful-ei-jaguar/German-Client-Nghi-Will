import React, { Component } from "react";
import { Textarea } from "../../components/Form/Form";
import DataService from "../../services/data-api-service";
import UserContext from "../../contexts/UserContext";
import "./LearningRoute.css";

class LearningRoute extends Component {
    
    static contextType = UserContext;
    
    state = {
        guess: '',
        currentWord: '',
        nextWord: '',
        wordCorrectCount: 0,
        wordIncorrectCount: 0,
        answered: false,
    };
    
    componentDidMount() {
        DataService.getHeadWord()
            .then(data => {
                this.context.setCurrentWord(data);
                this.context.setNextWord(data.nextWord);
                this.context.setTotalScore(data.totalScore)
            })
            .then(() => {
                this.setState({
                    nextWord: this.context.currentWord.nextWord,
                    currentWord:this.context.currentWord,
                    totalScore: this.context.currentWord.totalScore,
                    correctScore: this.context.currentWord.wordCorrectCount,
                    incorrectScore: this.context.currentWord.wordIncorrectCount
                })
            })
        
    }
    renderButton = () => {
        return !this.state.answered ? <button type='submit' id='check_button'>Check</button> :
        this.state.answered ? <button id='next-button' onClick={this.handleNextButton}>Try another word!</button> : null;
    };
    
    
    handleNextButton = () => {
        this.setState({
            answered: false,
            isCorrect: null,
        });
        DataService.getHeadWord()
            .then(data => {
                this.context.setCurrentWord(data);
                this.context.setNextWord(data.nextWord)
            })
            .then(() => {
                this.setState({
                    totalScore: this.context.currentWord.totalScore,
                    correctScore: this.context.currentWord.wordCorrectCount,
                    incorrectScore: this.context.currentWord.wordIncorrectCount,
                })
            })
    };
    
    renderFeedBack = () => {
        return (
            this.context.isCorrect ? <div className='feedback'><h3>You were correct! :D</h3>
                        <p>The correct translation for {this.context.currentWord.nextWord} was {this.context.answer} and you chose {this.state.guess}!</p>
                    </div>
            :
                    <div className='feedback'>
                        <h3>Good try, but not quite right :(</h3>
                        <p>The correct translation for {this.context.currentWord.nextWord} was {this.context.answer} and you chose {this.state.guess}!</p>
                    </div>)
            };
        
    
    
    handleSubmitAnswer = e => {
        e.preventDefault();
        this.setState({
            answered: true,
        });
        DataService.postGuess({guess: this.state.guess})
            .then(data => {
                this.context.setWordCorrectCount(data.wordCorrectCount);
                this.context.setWordIncorrectCount(data.wordIncorrectCount);
                this.context.setTotalScore(data.totalScore);
                this.context.setAnswer(data.answer);
                this.context.setIsCorrect(data.isCorrect);
                this.setState({nextWord: data.nextWord});
                
                if(data.isCorrect) {
                    this.setState({
                        correctScore: this.state.correctScore + 1}
                    )
                }
                else {
                    this.setState({incorrectScore: this.state.incorrectScore + 1})
                }
            })
    };
    
    handleGuessField = (e) => {
        this.setState({
            guess: e.target.value,
        })
    };
    
    render() {
        const {  wordCorrectCount, wordIncorrectCount, currentWord, totalScore} = this.context;
        
        return (
                        <section className="learning-word-section">
                        <div className="learning-heading">
                            <h2>
                                Translate this word<span className="currentWord">{currentWord.nextWord}</span>
                            </h2>
                </div>
                        <form onSubmit={() => this.handleSubmitAnswer}>
                            {this.state.answered && this.renderFeedBack()}
                            <Textarea
                                id="learn-guess-input"
                                type="text"
                                placeholder="Answer here"
                                onChange={this.handleGuessField}
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
                        </div></section>
        )};
}

export default LearningRoute;