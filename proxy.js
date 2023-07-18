const express = require('express');
const fetch = import('node-fetch');

const app = express();
const port = 3000;

app.get('/github-proxy', async (req, res) => {
  const url = req.query.url;

  try {
    const response = await fetch(url);
    const data = await response.text();
    res.send(data);
  } catch (error) {
    console.error('Error fetching file:', error);
    res.status(500).send('Error fetching file');
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
