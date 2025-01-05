<script lang="ts" setup>
const storedUsername = useCookie("username");
const user = useUser();

const logout = () => {
  // remove user data
  storedUsername.value = null;
  user.value = null;

  navigateTo({
    path: "/",
    replace: true,
  });
};

onMounted(() => {
  logout();
});
</script>
