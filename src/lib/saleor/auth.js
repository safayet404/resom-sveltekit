
import { PUBLIC_API_URL, PUBLIC_CHANNEL, PUBLIC_REDIRECT_URL } from "$env/static/public";

export const saleorApiUrl = PUBLIC_API_URL;
export const defaultChannel = PUBLIC_CHANNEL;


export async function refreshToken(refreshToken) {
  console.log("Attempting refresh with token:", refreshToken);

  const res = await fetch(saleorApiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        mutation RefreshToken($refreshToken: String!) {
          tokenRefresh(refreshToken: $refreshToken) {
            token
            errors {
              message
            }
          }
        }
      `,
      variables: { refreshToken }
    })
  });

  const json = await res.json();
  console.log("Raw refresh response:", json);

  const data = json?.data?.tokenRefresh;

  if (!data?.token || data.errors?.length) {
    console.log("Refresh failed:", data?.errors);
    return null;
  }

  return {
    token: data.token,

  };
}



export async function register(email, password) {
  const response = await fetch(saleorApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        mutation Register($email: String!, $password: String!, $redirectUrl: String!, $channel: String!) {
          accountRegister(input: {
            email: $email,
            password: $password,
            redirectUrl: $redirectUrl,
            channel: $channel
          }) {
            errors {
              field
              message
              code
            }
            user {
              id
              email
            }
          }
        }
      `,
      variables: {
        email,
        password,
        redirectUrl: `${PUBLIC_REDIRECT_URL}confirm-email`,
        channel: defaultChannel,
      },
    }),
  });

  const json = await response.json();
  return {
    data: json?.data?.accountRegister,
    error: json?.errors?.[0] || json?.data?.accountRegister?.errors?.[0],
  };
}


export async function resetPassword({ email, password, confirmPassword, token }) {
  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  const res = await fetch(saleorApiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        mutation SetPassword($email: String!, $password: String!, $token: String!) {
          setPassword(email: $email, password: $password, token: $token) {
            token
            refreshToken
            errors {
              field
              message
            }
          }
        }
      `,
      variables: { email, password, token },
    }),
  });

  const json = await res.json();
  const errors = json?.data?.setPassword?.errors;

  if (errors?.length) {
    return { error: errors[0].message };
  }

  return {
    success: true,
    message: "✅ Password reset successfully!",
    tokens: {
      token: json.data.setPassword.token,
      refreshToken: json.data.setPassword.refreshToken
    }
  };
}
