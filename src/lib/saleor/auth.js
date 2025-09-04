import { PUBLIC_API_URL, PUBLIC_CHANNEL, PUBLIC_REDIRECT_URL } from "$env/static/public";

export const saleorApiUrl = PUBLIC_API_URL;
export const defaultChannel = PUBLIC_CHANNEL;

export async function refreshToken(refreshToken) {
  // console.log("Attempting refresh with token:", refreshToken);

  const res = await fetch(saleorApiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
      variables: { refreshToken },
    }),
  });

  const json = await res.json();
  console.log("text", json);

  //console.log("Raw refresh response:", json);

  const data = json?.data?.tokenRefresh;

  if (!data?.token || data.errors?.length) {
    //console.log("Refresh failed:", data?.errors);
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
      refreshToken: json.data.setPassword.refreshToken,
    },
  };
}

export async function getProfile(token) {
  if (!token) return { error: "Missing access token" };

  const res = await fetch(saleorApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `
        query {
          me {
            firstName
            lastName
            email
            metadata {
              key
              value
            }
          
          }
        }
      `,
    }),
  });

  const json = await res.json();
  const data = json?.data?.me;

  if (!data) {
    return {
      error: json?.errors?.[0]?.message || "Failed to fetch profile",
    };
  }

  const metadata = Object.fromEntries((data.metadata || []).map(({ key, value }) => [key, value]));

  return {
    user: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      metadata,
      address: {
        street1: data.defaultBillingAddress?.streetAddress1,
        street2: data.defaultBillingAddress?.streetAddress2,
        city: data.defaultBillingAddress?.city,
        postalCode: data.defaultBillingAddress?.postalCode,
        country: data.defaultBillingAddress?.country?.country,
        countryCode: data.defaultBillingAddress?.country?.code,
      },
    },
  };
}
