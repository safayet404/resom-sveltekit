import { s as saleorApiUrl } from "../../../../chunks/auth.js";
import { j as json } from "../../../../chunks/index.js";
async function POST({ request, cookies }) {
  const { email, password } = await request.json();
  process.env.NODE_ENV === "production";
  const response = await fetch(saleorApiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        mutation TokenAuth($email: String!, $password: String!) {
          tokenCreate(email: $email, password: $password) {
            token
            refreshToken
            user {
              email
              isActive
            }
            errors {
              message
            }
          }
        }
      `,
      variables: { email, password }
    })
  });
  const { data } = await response.json();
  const tokenCreate = data?.tokenCreate;
  if (tokenCreate?.errors?.length || !tokenCreate?.token) {
    return json({ error: tokenCreate?.errors?.[0]?.message || "Login failed" }, { status: 401 });
  }
  cookies.set("authToken", tokenCreate.token, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 60 * 60
  });
  cookies.set("refreshToken", tokenCreate.refreshToken, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 60 * 60 * 24 * 30
  });
  return json({
    success: true,
    user: tokenCreate.user
  });
}
export {
  POST
};
