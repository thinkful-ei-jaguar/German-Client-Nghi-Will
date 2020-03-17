import config from "../config";
import TokenService from "./token-service";

const DataService = {
 
	getWords(user) {
		return fetch(`${config.API_ENDPOINT}/language`, {
			headers: {
				'content-type' : 'application/json',
				authorization: `Bearer ${TokenService.getAuthToken()}`
			},
	
		}).then(res => !res.ok ? res.json().then(event => Promise.reject(event)) : res.json());
	},
	getWord() {
		return fetch(`${config.API_ENDPOINT}/language/head`, {
			headers: {
				authorization: `Bearer ${TokenService.getAuthToken()}`
			}
		}).then(res => !res.ok ? res.json().then(event => Promise.reject(event)) : res.json());
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
