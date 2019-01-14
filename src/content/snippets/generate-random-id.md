## Generate Random ID

Generate a random alphanumic id of the specified length.

```js
const generateRandomId = (length) => {
  let id = '';
  const options = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    id += options.charAt(Math.floor(Math.random() * options.length));
  }

  return id;
};
```
