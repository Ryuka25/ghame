import type { H3Event } from "h3";

export default defineEventHandler(async (event: H3Event) => {
  const users = await fetchTopUsers();

  return getTopUsersByFollowers(users);
});
