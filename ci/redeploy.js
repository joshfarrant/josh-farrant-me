const http = require('http');
const createHandler = require('github-webhook-handler');

const handler = createHandler({ path: '/webhook', secret: process.env.GITHUB_SECRET });
const PORT = 3456;

http.createServer((req, res) => {
  handler(req, res, () => {
    res.statusCode = 404;
    res.end('Not found');
  });
}).listen(PORT);

handler.on('error', (err) => {
  console.error('Error:', err.message); // eslint-disable-line no-console
});

handler.on('push', () => {
  console.log('Push'); // eslint-disable-line no-console
});
