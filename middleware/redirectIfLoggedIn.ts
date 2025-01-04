export default defineNuxtRouteMiddleware(() => {
  const storedUsername = useCookie("username");

  // if user is logged in redirect to /app
  if (storedUsername.value) {
    return navigateTo({
      path: "/app/",
      replace: true,
    });
  }
});
