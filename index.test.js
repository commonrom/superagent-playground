const test = require('node:test');
const assert = require('node:assert');
const { add, subtract, median } = require('./index');

test('index re-exports all helper functions', () => {
  assert.strictEqual(add(2, 3), 5);
  assert.strictEqual(subtract(5, 3), 2);
  assert.strictEqual(median([3, 1, 2]), 2);
});
