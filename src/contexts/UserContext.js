
import React, { Component } from 'react'
import AuthApiService from '../services/auth-api-service'
import TokenService from '../services/token-service'
import IdleService from '../services/idle-service'
import DataService from '../services/data-api-service';

const UserContext = React.createContext({
  user: {},
  userLanguage: {},
  currentWord: {},
  nextWord: {},
  totalScore: 0,
  wordCorrectCount: 0,
  wordIncorrectCount: 0,
  isCorrect: null,
  answer: null,
  guess: {},
  error: null,
  setError: () => {},
  clearError: () => {},
  setUser: () => {},
  setUserLanguage: () => {},
  setCurrentWord: () => {},
  setGuess: () => {},
  resetNextWord: () => {},
  setTotalScore: () => {},
  resetWordCorrectCount: () => {},
  resetWordIncorrectCount: () => {},
  resetIsCorrect: () => {},
  resetAnswer: () => {},
  processLogin: () => {},
  processLogout: () => {},
})

export default UserContext

export class UserProvider extends Component {
    constructor(props) {
      super(props);
      const state = {
        user: {}, userLanguage: {}, currentWord: {}, nextWord: '', totalScore: 0, wordCorrectCount: 0, wordIncorrectCount: 0, isCorrect: null, answer: null, guess: {},  error: null }
      
      const jwtPayload = TokenService.parseAuthToken()
      
      if (jwtPayload)
        state.user = {
          id: jwtPayload.user_id,
          name: jwtPayload.name,
          username: jwtPayload.sub,
        }
      
      this.state = state;
      IdleService.setIdleCallback(this.logoutBecauseIdle)
    }
    
    componentDidMount() {
      if (TokenService.hasAuthToken()) {
        IdleService.regiserIdleTimerResets()
        TokenService.queueCallbackBeforeExpiry(() => {
          this.fetchRefreshToken()
      DataService.getWords()
          .then(data => {
            this.setUserLanguage(data.language.name);
            this.setCurrentWord(data.words[0]);
            this.resetNextWord(data.words[1]);
            this.setTotalScore(data.totalScore)
            })
          .catch(err => this.setError(err))
        })
      }
    }
    
    
    
    componentWillUnmount() {
      IdleService.unRegisterIdleResets();
      TokenService.clearCallbackBeforeExpiry();
    }
    
    setError = error => {
      console.error(error)
      this.setState({ error })
    }
    
    clearError = () => {
      this.setState({ error: null })
    }
    
    setUser = user => {
      this.setState({ user })
    }
    
    setUserLanguage = userLanguage => {
      this.setState({ userLanguage })
    }
    
    setCurrentWord = currentWord => {
      this.setState({ currentWord })
    }
    
    setTotalScore = totalScore => {
      this.setState({ totalScore })
    }
    
    resetWordCorrectCount = wordCorrectCount => {
      this.setState({ wordCorrectCount })
    }
    
    resetWordIncorrectCount = wordIncorrectCount => {
      this.setState({ wordIncorrectCount })
    }
    
    resetIsCorrect = isCorrect => {
      this.setState({ isCorrect })
    }
    
    resetAnswer = answer => {
      this.setState({ answer })
    }
    
    resetNextWord = nextWord => {
      this.setState({ nextWord })
    }
    
    
    processLogin = authToken => {
      TokenService.saveAuthToken(authToken)
      const jwtPayload = TokenService.parseAuthToken()
      this.setUser({
        id: jwtPayload.user_id,
        name: jwtPayload.name,
        username: jwtPayload.sub,
      })
      IdleService.regiserIdleTimerResets()
      TokenService.queueCallbackBeforeExpiry(() => {
        this.fetchRefreshToken()
      })
    }
    
    processLogout = () => {
      TokenService.clearAuthToken()
      TokenService.clearCallbackBeforeExpiry()
      IdleService.unRegisterIdleResets()
      this.setUser({})
    }
    
    logoutBecauseIdle = () => {
      TokenService.clearAuthToken()
      TokenService.clearCallbackBeforeExpiry()
      IdleService.unRegisterIdleResets()
      this.setUser({ idle: true })
    }
    
    fetchRefreshToken = () => {
      AuthApiService.refreshToken()
          .then(res => {
            TokenService.saveAuthToken(res.authToken)
            TokenService.queueCallbackBeforeExpiry(() => {
              this.fetchRefreshToken()
            })
          })
          .catch(err => {
            this.setError(err)
          })
    }
    
    render() {
      const value = {
        user: this.state.user,
        userLanguage: this.state.userLanguage,
        currentWord: this.state.currentWord,
        nextWord: this.state.nextWord,
        totalScore: this.state.totalScore,
        wordCorrectCount: this.state.wordCorrectCount,
        wordIncorrectCount: this.state.wordIncorrectCount,
        answer: this.state.answer,
        isCorrect: this.state.isCorrect,
        guess: this.state.guess,
        error: this.state.error,
        setError: this.setError,
        clearError: this.clearError,
        setUser: this.setUser,
        setUserLanguage: this.setUserLanguage,
        setCurrentWord: this.setCurrentWord,
        setTotalScore: this.setTotalScore,
        resetNextWord: this.resetNextWord,
        resetWordCorrectCount: this.resetWordCorrectCount,
        resetWordIncorrectCount: this.resetWordIncorrectCount,
        resetAnswer: this.resetAnswer,
        resetIsCorrect: this.resetIsCorrect,
        processLogin: this.processLogin,
        processLogout: this.processLogout,
      }
      
      return (
          <UserContext.Provider value={value}>
            {this.props.children}
          </UserContext.Provider>
      )
    }
}