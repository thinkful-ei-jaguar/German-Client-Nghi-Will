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
  }
};

export default DataService;
