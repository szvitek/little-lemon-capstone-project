import { fetchAPI } from './api';

// reducer fn
export function updateTimes(state, action) {
  switch (action.type) {
    case 'addDate':
      const newDate = new Date(action.payload);
      return fetchAPI(newDate);
    default:
      return state;
  }
}

// reducer init fn
export function initializeTimes() {
  return fetchAPI(new Date());
}
