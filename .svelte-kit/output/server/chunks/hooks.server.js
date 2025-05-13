import { r as refreshToken } from "./auth.js";
import { i as isTokenExpired, g as getUserFromToken, d as decodeJwt } from "./session.js";
async function handle({ event, resolve }) {
  const token = event.cookies.get("authToken");
  const refresh = event.cookies.get("refreshToken");
  let user = null;
  console.log("Landing page cookies:", {
    auth: event.cookies.get("authToken"),
    refresh: event.cookies.get("refreshToken")
  });
  if (token && !isTokenExpired(token)) {
    user = getUserFromToken(token);
  } else if (refresh) {
    const refreshed = await refreshToken(refresh);
    if (refreshed?.token) {
      event.cookies.set("authToken", refreshed.token, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 60 * 60
        // 1 hour
      });
      const decoded = decodeJwt(refreshed.token);
      if (decoded?.email) {
        user = {
          email: decoded.email,
          id: decoded.user_id || decoded.userId,
          token: refreshed.token
        };
      }
    }
  }
  event.locals.user = user;
  return resolve(event);
}
export {
  handle
};
