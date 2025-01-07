export default defineNuxtRouteMiddleware(() => {
  const storedUsername = useCookie("username");

  // if user is logged in redirect to /dashboard
  if (storedUsername.value) {
    return navigateTo({
      path: "/dashboard",
      replace: true,
    });
  }
});
