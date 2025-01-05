import type { H3Event } from "h3";

export default defineEventHandler(async (event: H3Event) => {
  const username = getCookie(event, "username");
  if (username) event.context.user = { username: username };
});
