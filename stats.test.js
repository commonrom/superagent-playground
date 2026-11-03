const test = require('node:test');
const assert = require('node:assert');
const { median, variance } = require('./src/stats');

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
