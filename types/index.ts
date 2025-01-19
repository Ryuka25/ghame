/**
 * Represents a user.
 *
 * @comment Normalize the user data by using the `normalizeUser` function.
 */
export interface User {
  name: string;
  login: string;
  avatarUrl: string;
  location: string;
  initial: string;
  followers: number;
  company: string;
  twitterUsername: string;
  url: string;
}

/**
 * Represents a ranked user.
 *
 * @comment Normalizes the user data by using the `normalizeRankedUser` function.
 */
export interface RankedUser extends User {
  rank: number;
  privateContributions: number;
  publicContributions: number;
  totalContributions: number;
}
