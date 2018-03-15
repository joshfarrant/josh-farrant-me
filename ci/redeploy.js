/* eslint-disable no-console */

const http = require('http');
const { exec } = require('child_process');
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
  console.error('Error:', err.message);
});

handler.on('push', () => {
  console.log('Push');

  exec('cd /var/www/farrant-me && git pull && npm i && npm run build', (err, stdout, stderr) => {
    if (err) {
      return;
    }

    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
});
