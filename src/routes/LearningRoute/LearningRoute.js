import React, { Component } from "react";
import DataService from '../../services/data-api-service';
import UserContext from '../../contexts/UserContext';

class LearningRoute extends Component {
  static ContextType = UserContext;
  
  state = {
    currentWord: {},
    isCorrect: false
  };
  
  componentDidMount() {
      DataService.getWord().then(
          word => this.setState({currentWord: word}))
  }
  
  
  handleSubmit = ev => {
        ev.preventDefault();
        const { guess } = ev.target;
         DataService.postGuess(guess.value)
            .then(response => {
                this.context.setGuess(response);
            })
            .then(this.props.history.push('/Results'));
    };
  

  
  render() {
      const {original , correct_count, incorrect_count} = this.state.currentWord;
    return (
        <section className='learning-word-section'>
            <h3>{original}</h3>
            <h4>Times Correct: {correct_count} <br/> Times incorrect: {incorrect_count}</h4>
            
            <form>
            <input type="text" onSubmit={this.handleSubmit} placeholder="Answer here"/>
            <button type='submit'>Submit Answer</button>
            </form>
        </section>
    );
  }
}

export default LearningRoute;
