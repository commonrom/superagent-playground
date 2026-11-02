# superagent-playground

A tiny sandbox repo for testing dsh-superagent end to end.

## Files

- `index.js` — unified entry point re-exporting all helpers
- `src/arithmetic.js` — arithmetic helpers (`add`, `subtract`)
- `src/stats.js` — statistical helpers (`median`)
- `*.test.js` — test suites for the built-in Node.js test runner

## Usage

Call the `add` helper from the `index.js` entry point with `node -e`:

```sh
node -e "console.log(require('./index').add(2, 3))"
```

This prints `5`.
