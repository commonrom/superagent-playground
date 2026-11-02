const test = require('node:test');
const assert = require('node:assert');
const { add, subtract } = require('./src/arithmetic');

test('add returns the sum of two numbers', () => {
  assert.strictEqual(add(2, 3), 5);
  assert.strictEqual(add(-1, 1), 0);
});

test('subtract returns a minus b', () => {
  assert.strictEqual(subtract(5, 3), 2);
  assert.strictEqual(subtract(3, 5), -2);
  assert.strictEqual(subtract(-1, 1), -2);
});
