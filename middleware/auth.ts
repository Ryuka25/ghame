export default defineNuxtRouteMiddleware((to, from) => {
  const storedUsername = useCookie("username");

  // if user is not logged in redirect to /
  if (!storedUsername.value) {
    return navigateTo({
      path: "/",
      query: { next: from.path },
      replace: true,
    });
  }
});
