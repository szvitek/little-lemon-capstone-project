import { fetchAPI } from './api';
import { initializeTimes, updateTimes } from './utils';

test('Initializer functions works', () => {
  const result = initializeTimes();

  expect(result.length).toBeGreaterThan(0);
  expect([
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
    '22:00',
    '22:30',
    '23:00',
    '23:30',
  ]).toEqual(expect.arrayContaining(result));
});

test('updateTimes returns the default values', () => {
  const result = updateTimes(['17:00', '21:30', '23:30'], { type: 'unknown' });

  expect(result).toEqual(['17:00', '21:30', '23:30']);
});

test('updateTimes returns the correct values for tomorrow', () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowString = tomorrow.toISOString().split('T')[0];

  const timesForTomorrow = fetchAPI(tomorrow);
  const result = updateTimes(['17:00', '21:30', '23:30'], {
    type: 'addDate',
    payload: tomorrowString,
  });

  expect(result).toEqual(timesForTomorrow);
});
