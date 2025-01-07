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
 * Gets the top 10 users sorted by their number of followers.
 *
 * @param {RankedUser[]} users - The array of users to sort and rank.
 * @returns {RankedUser[]} The top 10 ranked users sorted by followers.
 */
export function getTop10UsersByFollowers(users: RankedUser[]): RankedUser[] {
  return getTopUsersByFollowers(users).slice(0, 10);
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
 * Gets the top 10 users sorted by their number of public contributions.
 *
 * @param {RankedUser[]} users - The array of users to sort and rank.
 * @returns {RankedUser[]} The top 10 ranked users sorted by public contributions.
 */
export function getTop10UsersByPublicContributions(
  users: RankedUser[],
): RankedUser[] {
  return getTopUsersByPublicContributions(users).slice(0, 10);
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

/**
 * Gets the top 10 users sorted by their total contributions.
 *
 * @param {RankedUser[]} users - The array of users to sort and rank.
 * @returns {RankedUser[]} The top 10 ranked users sorted by total contributions.
 */
export function getTop10UsersByTotalContributions(
  users: RankedUser[],
): RankedUser[] {
  return getTopUsersByTotalContributions(users).slice(0, 10);
}
