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
  const CHUNK_SIZE = 10 ** 6;

  let [start, end] = range.split('-');
  start = Number(start);
  end = end ? Number(end) : Math.min(start + CHUNK_SIZE, videoSize - 1);

  const contentLength = end - start + 1;
  const headers = {
    'Content-Range': `bytes ${start}-${end}/${videoSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': contentLength,
    'Content-Type': 'video/mp4',
  };
  res.writeHead(206, headers);
  const videoStream = fs.createReadStream(finalPath, { start, end });
  videoStream.pipe(res);
});

export default fromNodeMiddleware(app);
