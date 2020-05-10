let _timeoutId;
let _idleCallback = null;
let _notIdleEvents = [
  "mousedown",
  "mousemove",
  "keypress",
  "scroll",
  "touchstart"
];
const _FIVE_MINUTES_IN_MS = 5 * 60 * 1000;

const IdleService = {
  // Keeps track of idle timer
  setIdleCallback(idleCallback) {
    _idleCallback = idleCallback;
  },
  // Restart idle timer
  resetIdleTimer(ev) {
    clearTimeout(_timeoutId);
    _timeoutId = setTimeout(_idleCallback, _FIVE_MINUTES_IN_MS);
  },
  // Set idle timer
  registerIdleTimerResets() {
    _notIdleEvents.forEach(event =>
      document.addEventListener(event, IdleService.resetIdleTimer, true)
    );
  },
  // Clear idle timer
  unRegisterIdleResets() {
    clearTimeout(_timeoutId);
    _notIdleEvents.forEach(event =>
      document.removeEventListener(event, IdleService.resetIdleTimer, true)
    );
  }
};

export default IdleService;
