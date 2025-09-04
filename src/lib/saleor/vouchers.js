import { gql, request } from "graphql-request";
import { defaultChannel, saleorApiUrl } from "$lib/saleor/auth";

export async function fetchVouchersAll() {
  const query = `
    query GetVouchers($first: Int = 10) {
      vouchers(first: $first) {
        edges {
          node {
            id
            code
            discountValue
            discountValueType
            type
            startDate
            endDate
            usageLimit
            used
            minCheckoutItemsQuantity
            minSpent {
              amount
              currency
            }
            applyOncePerOrder
            onlyForStaff
          }
        }
      }
    }
  `;

  const response = await fetch(saleorApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjZ1dUY1SV9LeU5wWDl5STd6WlFVR2QzYVNNaTJ1THBhbkx3Q2pnemt2SW8iLCJ0eXAiOiJKV1QifQ.eyJpYXQiOjE3NTMzNzkyNDQsIm93bmVyIjoic2FsZW9yIiwiaXNzIjoiaHR0cHM6Ly9hcGktYmV0YS5yZXNvbS5jb20uYnIvZ3JhcGhxbC8iLCJleHAiOjE3NTMzNzk1NDQsInRva2VuIjoiejBnNFRVMkxEZTdsIiwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsInR5cGUiOiJhY2Nlc3MiLCJ1c2VyX2lkIjoiVlhObGNqb3lNUT09IiwiaXNfc3RhZmYiOnRydWV9.ICoyb5ihu4yT6UBaX8BTOKLmwZ3-yjjUNcLv0vsDg56vDJuDq1Cs44e8F6VFxSLg9I_czS5xaEL8LYOfSk1XMdAmryHGEierj9se-kGTmGVU73jdVV_7V5_pLsSbzS6vqlPBeN6PkjDmPwTYm1Mtfj2-1-NzrYvyJK7inXYHSllNANy3Sm9wJpuErysRAqCLZL5UaDEvb-4BHAflzvVtHRViYNhmzw4YiI9tnEdaVhcblRE1nrNPs5aXKO4ABnAk3Az6SIhaQ5js3V057NZTdFvPzaqChxi_JDNrWAQYmkjwP8XafZdIQ5t67Qg8c4dz9FTOqCfKZDw9CowfT3dClQ`,
    },
    body: JSON.stringify({
      query,
      variables: { first: 50 },
    }),
  });

  const json = await response.json();

  if (json.errors) {
    console.error("GraphQL Errors:", json.errors);
    return [];
  }

  const nodes = json?.data?.vouchers?.edges?.map((e) => e.node) || [];

  return nodes.map((item) => ({
    id: item?.id,
    code: item?.code,
    discountType: item?.discountValueType,
    discountValue: item?.discountValue,
    type: item?.type,
  }));
}
