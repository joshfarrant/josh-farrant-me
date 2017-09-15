/**
 * Shorthand convenience function for building actions
 * Structured based on Flux Standard Actions
 * https://github.com/acdlite/flux-standard-action
 */

const actionBuilder = (
  type,
  payload,
  error = false,
) => ({
  type,
  payload,
  error,
});

const actionCreator = actionName => (...args) => actionBuilder(actionName, ...args);

export default actionCreator;
