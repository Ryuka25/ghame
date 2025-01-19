import {
  getGithubUser,
  getGraphqlWithAuth,
} from "~/server/utils/github-services";

export default defineEventHandler(async (event) => {
  const { username } = getRouterParams(event);

  const config = useRuntimeConfig();
  const githubToken = config.githubToken;
  const graphqlWithAuth = getGraphqlWithAuth(githubToken);

  try {
    return await getGithubUser(graphqlWithAuth, username as string);
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
