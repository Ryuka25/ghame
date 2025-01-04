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
      }
    }
  `,
  );
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const username = body?.username;

  if (!username) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Field 'username' is required in the request body",
    });
  }

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
      message: "Unable to fetch user with provided username",
      data: {
        username: username,
      },
    });
  }
});
