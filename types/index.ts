/**
 * Represents a user.
 *
 * @comment Normalize the user data by using the `normaliseUser` function.
 */
export interface User {
  name: string;
  login: string;
  avatarUrl: string;
  location: string;
  initial: string;
}

/**
 * Represents a ranked user.
 *
 * @comment Normalizes the user data by using the `normaliseRankedUser` function.
 */
export interface RankedUser extends User {
  rank: number;
  company: string;
  twitterUsername: string;
  followers: number;
  privateContributions: number;
  publicContributions: number;
  totalContributions: number;
}
