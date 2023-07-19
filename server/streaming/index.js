import express from 'express';
import path from 'path';
import fs from 'fs';
const app = express();
app.use(express.json());

app.get('*', async (req, res) => {
  const relPath = decodeURIComponent(req.params[0]);
  const { homeDirectory } = useRuntimeConfig();
  const finalPath = relPath ? path.join(homeDirectory, relPath) : homeDirectory;

  let range = structuredClone(req.headers.range);
  range = range.replace('bytes=', '');
  if (!range) {
    res.status(400).send('Requires Range header');
  }

  const videoSize = fs.statSync(finalPath).size;

  let [start] = range.split('-');
  start = Number(start);

  const headers = {
    'Content-Range': `bytes ${start}-${videoSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': videoSize - start,
    'Content-Type': 'video/mp4',
  };

  res.writeHead(206, headers);
  const videoStream = fs.createReadStream(finalPath, { start });
  videoStream.pipe(res);
});

export default fromNodeMiddleware(app);
