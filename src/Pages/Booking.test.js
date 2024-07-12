import { initializeTimes, updateTimes } from './Booking';

test('Initializer functions works', () => {
  const result = initializeTimes();

  expect(result).toHaveLength(6);
  expect(result).toEqual(
    expect.arrayContaining([
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00',
    ])
  );
});

test('updateTimes returns the default values', () => {
  const result = updateTimes({ test: 'passed' }, null);

  expect(result).toEqual({ test: 'passed' })
})
