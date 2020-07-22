import hotkeys from 'hotkeys-js';

const observerMap = {};
export function addKeyCallback(key, callback) {
  if (!observerMap[key]) {
    observerMap[key] = [];
    hotkeys(key, () => executeCallbacks(key));
  }
  observerMap[key].push(callback);
}
export function removeKeyCallback(key, callback) {
  observerMap[key] = observerMap[key].filter(item => item !== callback);
}

function executeCallbacks(key) {
  for (const ob of observerMap[key]) {
    ob();
  }
}
