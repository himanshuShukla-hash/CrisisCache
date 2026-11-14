const http = require('http');
const fs = require('fs');
const path = require('path');

let sseClients = [];
let eventsLedger = [];

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // SSE Stream for live peer-to-peer event propagation
  if (req.url === '/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });

    res.write(`data: ${JSON.stringify({ type: 'INIT', history: eventsLedger })}\n\n`);
    sseClients.push(res);

    req.on('close', () => {
      sseClients = sseClients.filter(client => client !== res);
    });
    return;
  }

  // Broadcast endpoint: Trigger SOS or Event
  if (req.url === '/broadcast' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const event = JSON.parse(body);
        event.serverTimestamp = Date.now();
        eventsLedger.push(event);
        if (eventsLedger.length > 50) eventsLedger.shift();

        // Broadcast to all connected laptop nodes instantly
        const payload = `data: ${JSON.stringify({ type: 'BROADCAST', event })}\n\n`;
        sseClients.forEach(client => client.write(payload));

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, event }));
      } catch (err) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // Serve the live peer demo webpage
  if (req.url === '/' || req.url === '/index.html' || req.url === '/demo.html' || req.url === '/peer.html') {
    const filePath = path.join(__dirname, 'peer.html');
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading peer.html');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
      }
    });
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

const PORT = 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`CrisisCache Live Mesh Hub running on http://0.0.0.0:${PORT}`);
});
