// saleor/categories.js
import { saleorApiUrl } from "./auth";

export async function fetchCategoryTree() {
    const res = await fetch(saleorApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

    // Return only top-level categories (not flattened)
    return json?.data?.categories?.edges.map((e) => e.node) || [];
}
