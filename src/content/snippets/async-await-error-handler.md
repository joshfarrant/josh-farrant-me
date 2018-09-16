## Async/Await error handling Higher Order Function.

Originally written by [Wes Bos](https://wesbos.github.io/Async-Await-Talk/#60) for his [Async + Await talk](https://www.youtube.com/watch?v=9YkUCxvaLEk).

```js
const handleError = fn => (
  (...params) => fn(...params).catch(console.error)
);

// Wrap your async function in the error handler
const safeFunc = handleError(someAsyncFunc);

// Call the wrapped function, any errors are caught and logged
safeFunc();
```
