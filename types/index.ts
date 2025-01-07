/**
 * Represents a user.
 */
export interface User {
  name: string;
  login: string;
  avatarUrl: string;
  location: string;
}

export interface RankedUser extends User {
  rank: number;
  company: string;
  twitterUsername: string;
  followers: number;
  privateContributions: number;
  publicContributions: number;
  totalContributions: number;
}
