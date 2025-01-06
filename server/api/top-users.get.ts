import type { H3Event } from "h3";
import type { RankUser } from "~/types";

const TOP_MADAGASCAR_GITHUB_USERS =
  "https://raw.githubusercontent.com/tsirysndr/top-github-users/refs/heads/main/cache/madagascar.json";

const getTopUsersByFollowers = (users: RankUser[]) => {
  users.sort((a, b) => b.followers - a.followers);
  return users.slice(0, 10);
};

const getTopUsersByPublicContributions = (users: RankUser[]) => {
  users.sort((a, b) => b.publicContributions - a.publicContributions);
  return users.slice(0, 10);
};

const getTopUsersByTotalContributions = (users: RankUser[]) => {
  users.sort((a, b) => {
    return b.totalContributions - a.totalContributions;
  });
  return users.slice(0, 10);
};

export default defineEventHandler(async (event: H3Event) => {
  const usersJson = await $fetch<string>(TOP_MADAGASCAR_GITHUB_USERS);
  const users: RankUser[] = JSON.parse(usersJson);
  users.map(
    (user) =>
      (user.totalContributions =
        user.publicContributions + user.privateContributions),
  );

  return {
    followers: getTopUsersByFollowers(users),
    total_contributions: getTopUsersByTotalContributions(users),
    public_contributions: getTopUsersByPublicContributions(users),
  };
});
