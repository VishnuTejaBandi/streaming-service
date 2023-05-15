import axios from 'axios';

export default defineEventHandler(async (event) => {
  let { fileName } = await readBody(event);
  fileName = fileName.replace(/ *\([^)]*\) */g, '');

  const { openSubtitlesApiKey } = useRuntimeConfig();

  const { data: subtitles } = await axios({
    method: 'GET',
    url: `https://api.opensubtitles.com/api/v1/subtitles?languages=en&query="${fileName}"`,
    headers: { 'Api-Key': openSubtitlesApiKey },
  });

  const result = [];

  for (let index = 0; index < 10; index++) {
    const element = subtitles.data[index];
    const file = element?.attributes?.files?.[0];
    if (file) {
      result.push({
        id: file.file_id,
        name: file.file_name,
      });
    }
  }
  return result;
});
