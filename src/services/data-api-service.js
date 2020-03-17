import config from "../config";
import TokenService from "./token-service";
import UserContext from "../contexts/UserContext";

const DataService = {
  // Get user words and language
  getWords(user) {
    return fetch(`${config.API_ENDPOINT}/language`, {
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    }).then(res => {
      // Log user out if token expires
      if (res.status === 401) {
        return UserContext.processLogout();
      } else if (!res.ok) {
        return res.json().then(e => Promise.reject(e));
      } else {
        return res.json();
      }
    });
  },
  
  getNextWord() {
    return fetch(`${config.API_ENDPOINT}/language/head`, {
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    }).then(res => {
      if (res.status === 401) {
        return UserContext.processLogout();
      } else if (!res.ok) {
        return res.json().then(e => Promise.reject(e));
      } else {
        return res.json();
      }
    });
  },
  
  postGuess(guess) {
    return fetch(`${config.API_ENDPOINT}/language/guess`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({ guess })
    }).then(res =>
        !res.ok ? res.json().then(event => Promise.reject(event)) : res.json()
    );
  }
};

export default DataService;
