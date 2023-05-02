export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);

  const { admin } = useRuntimeConfig();

  if (username === admin.username && password === admin.password) {
    setCookie(event, 'auth_token', 'admin');
    return true;
  }
  return false;
});
