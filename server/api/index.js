// This is a Vercel-compatible serverless function.
// No app.listen() needed. Just export the function as default.

export default function handler(req, res) {
  // Handle different HTTP methods
  switch (req.method) {
    case 'GET':
      res.status(200).json({ message: 'GET request successful! Vercel API working ✅' });
      break;

    case 'POST':
      // Access JSON body data
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        const data = JSON.parse(body || '{}');
        res.status(200).json({ message: 'POST request received', data });
      });
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
