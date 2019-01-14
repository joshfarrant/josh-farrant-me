## Redux Action Creator

Shorthand convenience function for building Redux actions with a structure based on [Flux Standard Actions](https://github.com/acdlite/flux-standard-action).

```js
const actionCreator = (
  type,
  payload,
  error = false,
) => ({
  type,
  payload,
  error,
});
```
