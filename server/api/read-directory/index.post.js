import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  const { homeDirectory } = useRuntimeConfig();
  const { path: relPath } = (await readBody(event)) || {};

  const finalPath = relPath ? path.join(homeDirectory, relPath) : homeDirectory;

  let items = fs.readdirSync(finalPath, { withFileTypes: true });

  items = items.filter((item) => item.isDirectory() || item.isFile());

  items = items.map((item) => {
    const { name } = item;
    const type = item.isDirectory() ? 'directory' : 'file';
    return { name, type };
  });

  return items;
});
