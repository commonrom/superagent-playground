/** Unified entry point: re-export every helper module. */
module.exports = {
  ...require('./src/arithmetic'),
  ...require('./src/stats'),
};
