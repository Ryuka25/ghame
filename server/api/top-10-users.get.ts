import type { H3Event } from "h3";
import { fetchTopUsers } from "~/server/utils/users-services";

export default defineEventHandler(async (event: H3Event) => {
  const users = await fetchTopUsers();

  return {
    followers: getTop10UsersByFollowers(users),
    total_contributions: getTop10UsersByTotalContributions(users),
    public_contributions: getTop10UsersByPublicContributions(users),
  };
});
