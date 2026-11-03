/** Statistical helpers. */
function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

module.exports = { median };

/** Population variance of numbers. */
function variance(values) {
  const n = values.length;
  const mean = values.reduce((a, b) => a + b, 0) / n;
  const sum = values.reduce((acc, v) => acc + (v - mean) ** 2, 0);
  return sum / n;
}

module.exports = { median, variance };
