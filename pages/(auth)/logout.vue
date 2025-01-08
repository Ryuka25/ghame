<script lang="ts" setup>
const storedUsername = useCookie("username");
const user = useUser();

const logout = () => {
  // remove user data
  storedUsername.value = null;
  user.value = null;

  const router = useRouter();

  navigateTo(
    {
      path:
        router.currentRoute.value.query.next &&
        router.currentRoute.value.query.next !== "/dashboard"
          ? (router.currentRoute.value.query.next as string)
          : "/",
    },
    { replace: true },
  );
};

onMounted(() => {
  logout();
});
</script>
