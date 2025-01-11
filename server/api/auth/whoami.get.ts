import type { graphql } from "@octokit/graphql";
import { getGraphqlWithAuth } from "~/lib/utils";
import type { User } from "~/types";

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
  const username = event.context.user?.username;
  if (!username) throwUnauthorized();

  const config = useRuntimeConfig();
  const githubToken = config.githubToken;
  const graphlWithAuth = getGraphqlWithAuth(githubToken);

  try {
    const { user } = await getGithubUser(graphlWithAuth, username);
    return normaliseUser(user);
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
