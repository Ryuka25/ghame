import type { H3Event } from "h3";
import type { RankUser } from "~/types";

const TOP_MADAGASCAR_GITHUB_USERS =
  "https://raw.githubusercontent.com/tsirysndr/top-github-users/refs/heads/main/cache/madagascar.json";

export default defineEventHandler(async (event: H3Event) => {
  const usersJson = await $fetch<string>(TOP_MADAGASCAR_GITHUB_USERS);
  const users: RankUser[] = JSON.parse(usersJson);
  users.map(
    (user) =>
      (user.totalContributions =
        user.publicContributions + user.privateContributions),
  );

  return users;
});
