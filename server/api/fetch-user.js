// server/api/fetch-user.js

import https from 'https';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Only GET method allowed' });
  }

  const url = 'https://catfact.ninja/fact';

  https.get(url, (apiRes) => {
    let data = '';

    apiRes.on('data', (chunk) => {
      data += chunk;
    });

    apiRes.on('end', () => {
      try {
        const parsedData = JSON.parse(data);
        res.status(200).json({ success: true, fact: parsedData.fact });
      } catch (err) {
        res.status(500).json({ error: 'Error parsing response' });
      }
    });
  }).on('error', (err) => {
    res.status(500).json({ error: 'Failed to fetch data', details: err.message });
  });
}
