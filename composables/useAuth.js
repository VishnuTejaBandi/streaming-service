export default async function () {
  const authToken = useCookie('auth_token');
  const isLoggedIn = ref(false);
  if (authToken.value) {
    isLoggedIn.value = await $fetch('/api/login/session-check', {
      method: 'POST',
      body: {
        auth_token: authToken.value,
      },
    });
  }

  return { isLoggedIn };
}
