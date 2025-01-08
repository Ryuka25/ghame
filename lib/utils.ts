import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { graphql } from "@octokit/graphql";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

/**
 * Vue directive to autofocus an input element when it is mounted.
 *
 * @example
 * <template>
 *   <input v-focus />
 * </template>
 */
export const vFocus = {
  mounted: (el: { focus: () => any }) => el.focus(),
};
