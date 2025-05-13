import { r as refreshToken } from "../../../../chunks/auth.js";
import { i as isTokenExpired, g as getUserFromToken, d as decodeJwt } from "../../../../chunks/session.js";
import { j as json } from "../../../../chunks/index.js";
async function GET({ cookies }) {
  const token = cookies.get("authToken");
  const refresh = cookies.get("refreshToken");
  let user = null;
  if (token && !isTokenExpired(token)) {
    user = getUserFromToken(token);
  } else if (refresh) {
    const refreshed = await refreshToken(refresh);
    if (refreshed?.token) {
      cookies.set("authToken", refreshed.token, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
        maxAge: 60 * 60
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
  if (!user) return json({ user: null }, { status: 401 });
  return json(user);
}
export {
  GET
};
