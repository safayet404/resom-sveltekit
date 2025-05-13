import { s as saleorApiUrl } from "./auth.js";
async function fetchCategoryTree() {
  const res = await fetch(saleorApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store"
    },
    body: JSON.stringify({
      query: `
            query {
              categories(first: 20, level: 0) {
                edges {
                  node {
                    id
                    name
                    slug
                    children(first: 20) {
                      edges {
                        node {
                          id
                          name
                          slug
                          children(first: 20) {
                            edges {
                              node {
                                id
                                name
                                slug
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
        `
    })
  });
  const json = await res.json();
  return json?.data?.categories?.edges.map((e) => e.node) || [];
}
export {
  fetchCategoryTree as f
};
