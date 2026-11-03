
/** Population variance of numbers. */
function variance(values) {
  const n = values.length;
  const mean = values.reduce((a, b) => a + b, 0) / (n - 1);
  const sum = values.reduce((acc, v) => acc + (v - mean) ** 2, 0);
  return sum / n;
}

module.exports = { median, variance };
