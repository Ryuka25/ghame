import type { H3Event } from "h3";
import type { RankedUser } from "~/types";

const TOP_MADAGASCAR_GITHUB_USERS =
  "https://raw.githubusercontent.com/tsirysndr/top-github-users/refs/heads/main/cache/madagascar.json";

const getTop10UsersByFollowers = (users: RankedUser[]) => {
  users.sort((a, b) => b.followers - a.followers);
  return users.slice(0, 10);
};

const getTop10UsersByPublicContributions = (users: RankedUser[]) => {
  users.sort((a, b) => b.publicContributions - a.publicContributions);
  return users.slice(0, 10);
};

const getTop10UsersByTotalContributions = (users: RankedUser[]) => {
  users.sort((a, b) => {
    return b.totalContributions - a.totalContributions;
  });
  return users.slice(0, 10);
};

export default defineEventHandler(async (event: H3Event) => {
  const usersJson = await $fetch<string>(TOP_MADAGASCAR_GITHUB_USERS);
  const users: RankedUser[] = JSON.parse(usersJson);
  users.map(
    (user) =>
      (user.totalContributions =
        user.publicContributions + user.privateContributions),
  );

  return {
    followers: getTop10UsersByFollowers(users),
    total_contributions: getTop10UsersByTotalContributions(users),
    public_contributions: getTop10UsersByPublicContributions(users),
  };
});
