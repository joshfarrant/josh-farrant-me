const flatten = list => list.reduce(
  (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), [],
);

const sleep = ms => (
  new Promise(resolve => setTimeout(resolve, ms))
);

module.exports = {
  flatten,
  sleep,
};
