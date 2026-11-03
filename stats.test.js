const test = require('node:test');
const assert = require('node:assert');
const { median, variance, stdDev } = require('./src/stats');

test('median returns the middle value of an odd-length sequence', () => {
  assert.strictEqual(median([5, 1, 3]), 3);
});

test('median returns the middle value of unsorted numeric input', () => {
  assert.strictEqual(median([1, 10, 2]), 2);
});

test('median averages the two middle values of an even-length sequence', () => {
  assert.strictEqual(median([4, 1, 3, 2]), 2.5);
  assert.strictEqual(median([10, 2, 3, 1]), 2.5);
});

test('median handles negative numbers', () => {
  assert.strictEqual(median([3, -1, 2]), 2);
  assert.strictEqual(median([5, -2, -8, 1]), -0.5);
});

test('median does not mutate its input', () => {
  const values = [10, 1, 2];
  median(values);
  assert.deepStrictEqual(values, [10, 1, 2]);
});

test('variance of a single-element sequence is zero', () => {
  assert.strictEqual(variance([4]), 0);
});

test('variance of two elements averages the squared deviations', () => {
  assert.strictEqual(variance([1, 2]), 0.25);
});

test('variance of [2, 4, 6] divides the squared deviations by n', () => {
  // The squared deviations sum to 8; the population variance is 8 / 3.
  assert.strictEqual(variance([2, 4, 6]), 8 / 3);
});

test('stdDev of a single-element sequence is zero', () => {
  assert.strictEqual(stdDev([4]), 0);
});

test('stdDev of [2, 4, 6] is the square root of the population variance', () => {
  // The population variance is 8 / 3, so the standard deviation is its square root.
  assert.strictEqual(stdDev([2, 4, 6]), Math.sqrt(8 / 3));
});

test('stdDev of evenly spaced values matches the known standard deviation', () => {
  // Squared deviations from the mean 3 sum to 10; the population variance is 2.
  assert.strictEqual(stdDev([1, 2, 3, 4, 5]), Math.sqrt(2));
});

test('stdDev handles negative numbers', () => {
  assert.strictEqual(stdDev([-1, 1]), 1);
  assert.strictEqual(stdDev([-5, -5]), 0);
});
