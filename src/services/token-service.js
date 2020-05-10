import jwtDecode from "jwt-decode";
import config from "../config";

let _timeoutId;
const _TEN_SECONDS_IN_MS = 10000;

const TokenService = {
  // Save session token
  saveAuthToken(token) {
    window.localStorage.setItem(config.TOKEN_KEY, token);
  },
  // Get session token
  getAuthToken() {
    return window.localStorage.getItem(config.TOKEN_KEY);
  },
  // Remove session token
  clearAuthToken() {
    window.localStorage.removeItem(config.TOKEN_KEY);
  },
  // Check if session token is in storage
  hasAuthToken() {
    return !!TokenService.getAuthToken();
  },
  // Digest session token
  parseJwt(jwt) {
    return jwtDecode(jwt);
  },
  // Grab session token and digest
  parseAuthToken() {
    const authToken = TokenService.getAuthToken();
    if (authToken) return TokenService.parseJwt(authToken);
    else return undefined;
  },
  // Get milleseconds of when session token expires
  _getMsUntilExpiry(payload) {
    return payload.exp * 1000 - Date.now();
  },
  // Attemp to renew session token before it expires
  queueCallbackBeforeExpiry(callback) {
    const msUntilExpiry = TokenService._getMsUntilExpiry(
      TokenService.parseAuthToken()
    );
    _timeoutId = setTimeout(callback, msUntilExpiry - _TEN_SECONDS_IN_MS);
  },
  // Clear timer when session token expires
  clearCallbackBeforeExpiry() {
    clearTimeout(_timeoutId);
  }
};

export default TokenService;
