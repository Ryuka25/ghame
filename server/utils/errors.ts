/**
 * Throws an unauthorized error with a 401 status code.
 * This function is used to indicate that the user is not logged in.
 */
export function throwUnauthorized() {
  throw createError({
    statusCode: 401,
    statusMessage: "Unauthorized",
    message: "User is not logged in",
  });
}
