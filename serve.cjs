// Dev server for UNDERFALL.  node serve.cjs  ->  http://127.0.0.1:4173
//
// v2: serves any file under the project root instead of a fixed allowlist, so
// assets/sprites/** (the night-witch PNGs index.html loads at runtime) resolve.
// Path traversal is blocked by resolving against __dirname and rejecting anything
// that escapes it.

const http = require('node:http');
const fs   = require('node:fs');
const path = require('node:path');

const ROOT = __dirname;
const types = {
  '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8',
  '.js':'text/javascript; charset=utf-8', '.cjs':'text/javascript; charset=utf-8',
  '.json':'application/json; charset=utf-8', '.png':'image/png',
  '.jpg':'image/jpeg', '.gif':'image/gif', '.svg':'image/svg+xml',
  '.md':'text/markdown; charset=utf-8', '.txt':'text/plain; charset=utf-8'
};

http.createServer((req, res) => {
  let rel;
  try { rel = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400); return res.end('Bad request'); }
  if (rel === '/' || rel === '') rel = '/index.html';

  const file = path.resolve(ROOT, '.' + rel);
  if (file !== ROOT && !file.startsWith(ROOT + path.sep)) {
    res.writeHead(403); return res.end('Forbidden');
  }
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) { res.writeHead(404); return res.end('Not found'); }
    res.setHeader('Content-Type', types[path.extname(file).toLowerCase()] || 'application/octet-stream');
    res.setHeader('Cache-Control', 'no-store');
    fs.createReadStream(file)
      .on('error', () => { res.statusCode = 500; res.end(); })
      .pipe(res);
  });
}).listen(Number(process.env.UNDERFALL_PORT) || 4173, '127.0.0.1',
  () => console.log('UNDERFALL server ready on http://127.0.0.1:' + (Number(process.env.UNDERFALL_PORT) || 4173)));
