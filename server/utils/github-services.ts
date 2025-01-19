import { graphql } from "@octokit/graphql";
import { getInitialFromUser } from "~/server/utils/users-services";
import type { User } from "~/types";

/**
 * Returns a GraphQL client instance with authentication headers set for GitHub GraphQL API.
 *
 * @param githubToken - The GitHub token to be used for authentication.
 * @returns A GraphQL client instance with the authorization header set.
 * @remarks The GitHub GraphQL API endpoint is https://api.github.com/graphql.
 */
export function getGraphqlWithAuth(githubToken: string) {
  return graphql.defaults({
    headers: {
      authorization: `token ${githubToken}`,
    },
  });
}

interface GithubUserResponse {
  name: string;
  login: string;
  avatarUrl: string;
  location: string;
  company: string;
  twitterUsername: string;
  followers: {
    totalCount: number;
  };
}

function normalizeGithubUserResponse(
  githubUserResponse: GithubUserResponse,
): User {
  return {
    ...githubUserResponse,
    initial: getInitialFromUser(githubUserResponse),
    followers: githubUserResponse.followers.totalCount,
  };
}

export async function getGithubUser(
  graphqlWithAuth: typeof graphql,
  username: string,
): Promise<User> {
  const { user } = await graphqlWithAuth<{ user: GithubUserResponse }>(
    `
    query {
      user(login: "${username}") {
        name,
        login,
        avatarUrl,
        location,
        company,
        twitterUsername,
        followers {
          totalCount
        }
      }
    }
  `,
  );

  return normalizeGithubUserResponse(user);
}
