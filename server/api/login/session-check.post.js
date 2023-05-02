export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (body.auth_token === 'admin') {
    return true;
  }
  return false;
});
