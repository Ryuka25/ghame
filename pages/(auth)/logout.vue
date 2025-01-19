<script lang="ts" setup>
const storedUsername = useCookie("username");
const user = useUser();

const logout = () => {
  // remove user data
  storedUsername.value = null;
  user.value = null;

  const router = useRouter();

  const authenticatedRoutes = ["/dashboard"];

  function isAuthenticatedRoute(route: string) {
    return authenticatedRoutes.indexOf(route) !== -1;
  }

  navigateTo(
    {
      path:
        router.currentRoute.value.query.next &&
        isAuthenticatedRoute(router.currentRoute.value.query.next as string)
          ? "/"
          : (router.currentRoute.value.query.next as string),
    },
    { replace: true },
  );
};

onMounted(() => {
  logout();
});
</script>
