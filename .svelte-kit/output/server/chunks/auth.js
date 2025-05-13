const PUBLIC_API_URL = "https://api-beta.resom.com.br/graphql/";
const PUBLIC_CHANNEL = "channel-pln";
const saleorApiUrl = PUBLIC_API_URL;
const defaultChannel = PUBLIC_CHANNEL;
async function refreshToken(refreshToken2) {
  console.log("Attempting refresh with token:", refreshToken2);
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
      variables: { refreshToken: refreshToken2 }
    })
  });
  const json = await res.json();
  const data = json?.data?.tokenRefresh;
  if (!data?.token || data.errors?.length) {
    return null;
  }
  return {
    token: data.token
  };
}
export {
  defaultChannel as d,
  refreshToken as r,
  saleorApiUrl as s
};
