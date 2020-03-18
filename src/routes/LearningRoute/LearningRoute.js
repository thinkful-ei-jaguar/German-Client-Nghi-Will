import React, { Component } from "react";
import DataService from '../../services/data-api-service';
import LearningContext from '../../contexts/LearningContext';
import AnswerForm from '../../components/AnswerForm/AnswerForm';
import './LearningRoute.css';

class LearningRoute extends Component {
  static contextType = LearningContext;
    constructor(props) {
        super(props);
       
        this.state = {
            currentWord: '',
            correctCount: null,
            totalScore: null,
            incorrectCount: null,
            isCorrect: false,
            userAnswer: '',
            answer: {
                value: ''
            },
            guess: ' '
        };
    }
  componentDidMount() {
     
         DataService.getWord()
          .then(data => {
              this.setState({
                  currentWord: data.currentWord,
                  correctCount:data.wordCorrectCount,
                  totalScore: data.totalScore,
                  incorrectCount: data.wordIncorrectCount,
                  answer: data.answer
              })
             
  
    })
  }
updateUserAnswer = answer =>  {
      
      this.setState({
          userAnswer : {
              value: answer
          }
      })
  };
  handleAnswerSubmit = (e) =>  {
    e.preventDefault();
      const { userGuess } = this.state;
      const guess = userGuess.value;
      DataService.postGuess(guess)
          .then(data => {
            this.setState({
                nextWord: data.nextWord,
                wordCorrectCount: data.wordCorrectCount,
                wordIncorrectCount:data.wordIncorrectCount,
                currentWord: data.currentWord,totalScore: data.totalScore,
                answer: data.answer,
                isCorrect: data.isCorrect,
                guess: data.guess
            })
      })
      
};
  
  
  

  
  render() {
    console.log(this.state);
    const { currentWord, correctCount, totalScore, incorrectCount} = this.state;
    return (
        <section className='learning-word-section'>
            <h2>{currentWord}</h2>
            <ul class="past-results">
                <h5>Past results :</h5>
                <li>Correct: {correctCount}</li>
                <li>Incorrect: {incorrectCount}</li>
            </ul>
           <AnswerForm onChange={e => this.updateUserAnswer(e.target.value)} onSubmit={() => this.handleSubmit} />
        </section>
    );
  }
}

export default LearningRoute;
