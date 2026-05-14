const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Required for FFmpeg.wasm SharedArrayBuffer support
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
});

// FFmpeg WASM files need special headers
app.use('/ffmpeg', (req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
  if (req.path.endsWith('.wasm')) res.setHeader('Content-Type', 'application/wasm');
  next();
}, express.static(path.join(__dirname, 'public/ffmpeg')));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`\n  CAPBURN running at http://localhost:${PORT}\n`);
});
