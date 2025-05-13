function decodeJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64).split("").map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}
function isTokenExpired(token) {
  const decoded = decodeJwt(token);
  if (!decoded?.exp) return true;
  return decoded.exp < Date.now() / 1e3;
}
function getUserFromToken(token) {
  const decoded = decodeJwt(token);
  if (!decoded?.email || isTokenExpired(token)) {
    return null;
  }
  return {
    email: decoded.email,
    id: decoded.user_id || decoded.userId,
    token
  };
}
export {
  decodeJwt as d,
  getUserFromToken as g,
  isTokenExpired as i
};
