import type { RankedUser } from "~/types";

const TOP_MADAGASCAR_GITHUB_USERS =
  "https://raw.githubusercontent.com/tsirysndr/top-github-users/refs/heads/main/cache/madagascar.json";

/**
 * Normalizes the user data by adding a totalContributions field.
 *
 * @param {RankedUser[]} users - The array of users to normalize.
 * @returns {RankedUser[]} The normalized array of users.
 */
export function normalizeUsers(users: RankedUser[]): RankedUser[] {
  return users.map((user) => ({
    ...user,
    totalContributions: user.publicContributions + user.privateContributions,
  }));
}

/**
 * Fetches the top GitHub users from Madagascar and normalizes their data.
 *
 * @returns {Promise<RankedUser[]>} A promise that resolves to the normalized array of users.
 */
export async function fetchTopUsers(): Promise<RankedUser[]> {
  const usersJson = await $fetch<string>(TOP_MADAGASCAR_GITHUB_USERS);
  const users: RankedUser[] = JSON.parse(usersJson);

  return normalizeUsers(users);
}

/**
 * Ranks the users by their index in the array.
 *
 * @param {RankedUser[]} users - The array of users to rank.
 * @returns {RankedUser[]} The ranked array of users.
 */
export function rankUsers(users: RankedUser[]): RankedUser[] {
  return users.map((user, index) => ({
    ...user,
    rank: index + 1,
  }));
}

/**
 * Gets the top users sorted by their number of followers.
 *
 * @param {RankedUser[]} users - The array of users to sort and rank.
 * @returns {RankedUser[]} The ranked array of users sorted by followers.
 */
export function getTopUsersByFollowers(users: RankedUser[]): RankedUser[] {
  users.sort((a, b) => b.followers - a.followers);
  return rankUsers(users);
}

/**
 * Gets the top users sorted by their number of public contributions.
 *
 * @param {RankedUser[]} users - The array of users to sort and rank.
 * @returns {RankedUser[]} The ranked array of users sorted by public contributions.
 */
export function getTopUsersByPublicContributions(
  users: RankedUser[],
): RankedUser[] {
  users.sort((a, b) => b.publicContributions - a.publicContributions);
  return rankUsers(users);
}

/**
 * Gets the top users sorted by their total contributions.
 *
 * @param {RankedUser[]} users - The array of users to sort and rank.
 * @returns {RankedUser[]} The ranked array of users sorted by total contributions.
 */
export function getTopUsersByTotalContributions(
  users: RankedUser[],
): RankedUser[] {
  users.sort((a, b) => {
    return b.totalContributions - a.totalContributions;
  });
  return rankUsers(users);
}

export function getExtraUsersFromTopUser(
  users: RankedUser[],
  login: string,
): number {
  const indexOfUser = users.findIndex((user) => user.login === login);

  const indexOfLastTop10User = 9;
  const numberOfExtraUsers = 2;

  if (indexOfUser === -1) return [];

  if (indexOfUser <= indexOfLastTop10User) return [];

  return users.slice(indexOfUser - numberOfExtraUsers, indexOfUser + 1);
}
