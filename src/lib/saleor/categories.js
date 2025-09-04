// saleor/categories.js
import { saleorApiUrl } from "./auth";

import { PUBLIC_CHANNEL } from "$env/static/public";
import { gql } from "graphql-request";
export async function fetchCategoryTree() {
  const res = await fetch(saleorApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
        `,
    }),
  });

  const json = await res.json();

  return json?.data?.categories?.edges.map((e) => e.node) || [];
}

export async function fetchCategoryTreeTranslation(languageCode) {
  const res = await fetch(saleorApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: gql`
        query GetCategoryTree($lang: LanguageCodeEnum!) {
          categories(first: 20, level: 0) {
            edges {
              node {
                id
                name
                slug
                translation(languageCode: $lang) {
                  name
                }
                children(first: 20) {
                  edges {
                    node {
                      id
                      name
                      slug
                      translation(languageCode: $lang) {
                        name
                      }

                      children(first: 20) {
                        edges {
                          node {
                            id
                            name
                            slug
                            translation(languageCode: $lang) {
                              name
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
        }
      `,
      variables: {
        lang: languageCode?.toUpperCase(),
      },
    }),
  });

  const json = await res.json();

  return (
    json?.data?.categories?.edges.map((e) => {
      const node = e.node;
      return {
        ...node,
        name: node.translation?.name || node.name,
        children: {
          edges: node.children.edges.map((child) => {
            const c = child.node;
            return {
              node: {
                ...c,
                name: c.translation?.name || c.name,
                children: {
                  edges: c.children.edges.map((grandchild) => {
                    const gc = grandchild.node;
                    return {
                      node: {
                        ...gc,
                        name: gc.translation?.name || gc.name,
                      },
                    };
                  }),
                },
              },
            };
          }),
        },
      };
    }) || []
  );
}

export async function fetchCollectionTree() {
  const res = await fetch(saleorApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query GetCollections($channel: String!) {
          collections(first: 10, channel: $channel) {
            edges {
              node {
                id
                name
                slug
                backgroundImage {
                  alt
                  url
                }
              }
            }
          }
        }
      `,
      variables: {
        channel: PUBLIC_CHANNEL,
      },
    }),
  });

  const json = await res.json();

  if (!json.data || !json.data.collections) {
    console.error("Failed to fetch collections:", json.errors);
    return [];
  }

  return json.data.collections.edges.map((edge) => edge.node);
}

export async function fetchCollectionTreeTranslation(languageCode) {
  const res = await fetch(saleorApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: gql`
        query GetCollections($channel: String!, $lang: LanguageCodeEnum!) {
          collections(first: 10, channel: $channel) {
            edges {
              node {
                id
                slug
                name
                backgroundImage {
                  alt
                  url
                }
                translation(languageCode: $lang) {
                  name
                }
              }
            }
          }
        }
      `,
      variables: {
        channel: PUBLIC_CHANNEL,
        lang: languageCode?.toUpperCase(),
      },
    }),
  });

  const json = await res.json();

  if (!json.data || !json.data.collections) {
    return [];
  }

  return json.data.collections.edges.map((edge) => ({
    ...edge.node,
    name: edge.node.translation?.name || edge?.node?.name,
  }));
}
