import type { H3Event } from "h3";

interface User {
  login: string;
  name: string;
  avatar: string;
  location: string;
  company: string;
  twitterUsername: string;
  followers: number;
  privateContributions: number;
  publicContributions: number;
}

const TOP_MADAGASCAR_GITHUB_USERS =
  "https://raw.githubusercontent.com/tsirysndr/top-github-users/refs/heads/main/cache/madagascar.json";

const getTopUsersByFollowers = (users: Array<User>) => {
  users.sort((a, b) => b.followers - a.followers);
  return users.slice(0, 10);
};

const getTopUsersByPublicContributions = (users: Array<User>) => {
  users.sort((a, b) => b.publicContributions - a.publicContributions);
  return users.slice(0, 10);
};

const getTopUsersByTotalContributions = (users: Array<User>) => {
  users.sort((a, b) => {
    const bTotalContributions = b.publicContributions + b.privateContributions;
    const aTotalContributions = a.publicContributions + a.privateContributions;
    return bTotalContributions - aTotalContributions;
  });
  return users.slice(0, 10);
};

export default defineEventHandler(async (event: H3Event) => {
  const usersJson = await $fetch<string>(TOP_MADAGASCAR_GITHUB_USERS);
  const users: Array<User> = JSON.parse(usersJson);

  return {
    followers: getTopUsersByFollowers(users),
    "total-contributions": getTopUsersByTotalContributions(users),
    "public-contributions": getTopUsersByPublicContributions(users),
  };
});
