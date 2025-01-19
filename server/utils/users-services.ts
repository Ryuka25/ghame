import type { RankedUser, User } from "~/types";

const TOP_MADAGASCAR_GITHUB_USERS =
  "https://raw.githubusercontent.com/tsirysndr/top-github-users/refs/heads/main/cache/madagascar.json";

export function getInitialFromUser(user: { login: string; name: string }) {
  let initial = user.login.slice(0, 2);

  if (user.name) {
    const splitedName = user.name.split(" ");
    if (splitedName.length > 1) {
      initial = splitedName
        .slice(0, 2)
        .map((name) => name[0])
        .join("");
    }
    initial = user.name.slice(0, 2);
  }
  return initial.toUpperCase();
}

export function normaliseUser<T extends User>(user: T): T {
  return {
    ...user,
    initial: getInitialFromUser(user),
  };
}

/**
 * Normalizes the user data by adding an initial field.
 *
 * @param {User} user - The user to normalize.
 * @returns {User} The normalized user.
 */
export function normaliseRankedUser(user: RankedUser): RankedUser {
  return {
    ...normaliseUser(user),
    totalContributions: user.publicContributions + user.privateContributions,
  };
}

/**
 * Fetches the top GitHub users from Madagascar and normalizes their data.
 *
 * @returns {Promise<RankedUser[]>} A promise that resolves to the normalized array of users.
 */
export async function fetchTopUsers(): Promise<RankedUser[]> {
  const usersJson = await $fetch<string>(TOP_MADAGASCAR_GITHUB_USERS);
  const users: RankedUser[] = JSON.parse(usersJson);

  return users.map((user) => normaliseRankedUser(user));
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
): RankedUser[] {
  const indexOfUser = users.findIndex((user) => user.login === login);

  const indexOfLastTop10User = 9;
  const numberOfExtraUsers = 2;

  if (indexOfUser === -1) return [];

  if (indexOfUser <= indexOfLastTop10User) return [];

  return users.slice(
    indexOfUser - numberOfExtraUsers,
    indexOfUser + numberOfExtraUsers,
  );
}
