import { graphql } from "@octokit/graphql";
import type { User } from "~/types";

function getGraphqlWithAuth(githubToken: string) {
  console.log("token: ", githubToken);

  return graphql.defaults({
    headers: {
      authorization: `token ${githubToken}`,
    },
  });
}

interface GithubUserResponse {
  user: User;
}

function getGithubUser(
  graphqlWithAuth: typeof graphql,
  username: string,
): Promise<GithubUserResponse> {
  return graphqlWithAuth(
    `
    query {
      user(login: "${username}") {
        name,
        login,
        avatarUrl,
        location,
      }
    }
  `,
  );
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const username = (query?.username as string) || "";

  const config = useRuntimeConfig();
  const githubToken = config.githubToken;
  const graphlWithAuth = getGraphqlWithAuth(githubToken);

  try {
    const { user } = await getGithubUser(graphlWithAuth, username);
    return user;
  } catch (error) {
    console.error(error);

    throw createError({
      statusCode: 404,
      statusMessage: "Not found",
      message: `Unable to fetch user with a username '${username}'`,
      data: {
        username: username,
      },
    });
  }
});
