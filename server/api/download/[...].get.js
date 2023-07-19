import path from 'path';
import fs from 'node:fs';
import { sendStream } from 'h3';

export default defineEventHandler(async (event) => {
  const { homeDirectory } = useRuntimeConfig();
  const relPath = decodeURIComponent(event.context.params._);
  const finalPath = relPath ? path.join(homeDirectory, relPath) : homeDirectory;
  const size = fs.statSync(finalPath).size;
  setHeader(event, 'Content-Length', size);
  return sendStream(event, fs.createReadStream(finalPath));
});
