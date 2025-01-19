import {
  getGithubUser,
  getGraphqlWithAuth,
} from "~/server/utils/github-services";

export default defineEventHandler(async (event) => {
  const username = event.context.user?.username;
  if (!username) throwUnauthorized();

  const config = useRuntimeConfig();
  const githubToken = config.githubToken;
  const graphlWithAuth = getGraphqlWithAuth(githubToken);

  try {
    return await getGithubUser(graphlWithAuth, username);
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
