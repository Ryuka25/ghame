import type { H3Event } from "h3";
import { throwUnauthorized } from "~/server/utils/errors";
import {
  fetchTopUsers,
  getExtraUsersFromTopUser,
} from "~/server/utils/users-services";

export default defineEventHandler(async (event: H3Event) => {
  const username = event.context.user?.username;
  if (!username) throwUnauthorized();
  const users = await fetchTopUsers();

  const topUsersByFollowers = getTopUsersByFollowers(users);
  const extraUsersByFollowers = getExtraUsersFromTopUser(
    topUsersByFollowers,
    username,
  );
  const topUserByPublicContributions = getTopUsersByPublicContributions(users);
  const extraUsersByPublicContributions = getExtraUsersFromTopUser(
    topUserByPublicContributions,
    username,
  );

  const topUserByTotalContributions = getTopUsersByTotalContributions(users);
  const extraUserByTotalContributions = getExtraUsersFromTopUser(
    topUserByTotalContributions,
    username,
  );

  return {
    followers: topUsersByFollowers.slice(0, 10),
    extra_users_by_followers: extraUsersByFollowers,
    total_contributions: topUserByTotalContributions.slice(0, 10),
    extra_users_by_total_contributions: extraUserByTotalContributions,
    public_contributions: topUserByPublicContributions.slice(0, 10),
    extra_users_by_public_contributions: extraUsersByPublicContributions,
  };
});
