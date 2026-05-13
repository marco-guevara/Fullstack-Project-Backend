const isProduction = process.env.NODE_ENV === "production";

const authCookieName = process.env.AUTH_COOKIE_NAME || "token";

const authCookieOptions = {
  httpOnly: true,
  secure: process.env.COOKIE_SECURE
    ? process.env.COOKIE_SECURE === "true"
    : isProduction,
  sameSite: process.env.COOKIE_SAME_SITE || (isProduction ? "none" : "lax"),
  maxAge: process.env.COOKIE_MAX_AGE
    ? Number(process.env.COOKIE_MAX_AGE)
    : 60 * 60 * 1000,
  path: "/",
};

export {
  authCookieName,
  authCookieOptions,
};
