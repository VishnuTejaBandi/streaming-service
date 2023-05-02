const publicRoutes = [];

export default defineNuxtRouteMiddleware(async (to) => {
  if (!publicRoutes.includes(to.name)) {
    const { isLoggedIn } = await useAuth();

    if (to.name === 'login') {
      if (isLoggedIn.value) return navigateTo({ path: '/' });
    } else if (!isLoggedIn.value) {
      return navigateTo({
        name: 'login',
        query: { to: to.name },
      });
    }
  }
});
