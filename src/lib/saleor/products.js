import { fixImageUrl } from "$lib/utils/fixImageUrl.js";
import { parseEditorJs } from "../../utils/parseEditorsJs.js";
import { saleorApiUrl, defaultChannel } from "./auth.js";

export async function fetchProducts(limit = 4) {
  const response = await fetch(saleorApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `
        query Products($limit: Int!, $channel: String!) {
          products(first: $limit, channel: $channel) {
            edges {
              node {
                id
                name
                slug
                
                thumbnail {
                  url
                }
                pricing {
                  priceRange {
                    start {
                      gross {
                        amount
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
        limit,
        channel: defaultChannel
      }
    })
  });

  const json = await response.json();
  const nodes = json?.data?.products?.edges?.map((e) => e.node) || [];

  // Optionally map to simplified format
  return nodes.map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    image: item.thumbnail?.url.replace(/^https:\/\/https:\/\//, "https://"),

    price: item.pricing?.priceRange?.start?.gross?.amount,
    discount: null, // Saleor doesn't handle discounts natively here, set manually or via metadata
    rating: 4.5 // You can mock ratings or store them in metadata
  }));
}

// =============================
// fetchProductById.js (with SvelteKit UI support)
// =============================

export async function fetchProductById(id, channel = defaultChannel) {
  const res = await fetch(saleorApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `
        query ProductById($id: ID!, $channel: String!) {
          product(id: $id, channel: $channel) {
            id
            name
            slug
            description
            category {
              id
            }
            media {
              id
              url
            }
            thumbnail {
              url
            }
            pricing {
              priceRange {
                start {
                  gross {
                    amount
                  }
                }
              }
            }
            attributes {
              attribute {
                name
                slug
              }
              values {
                name
                slug
              }
            }
            variants {
              id
              name
              pricing {
                price {
                  gross {
                    amount
                  }
                }
              }
              attributes {
                attribute {
                  name
                  slug
                }
                values {
                  name
                }
              }
            }
          }
        }
      `,
      variables: { id, channel }
    })
  });

  const json = await res.json();
  const p = json?.data?.product;
  if (!p) return null;

  const editorJson =
    typeof p.description === "string"
      ? JSON.parse(p.description)
      : p.description;

  const variantAttrs = p.variants.flatMap((v) => v.attributes);
  const productAttrs = p.attributes;
  const allAttributes = [...variantAttrs, ...productAttrs];

  const matchAttribute = (a, keys) => {
    const name = a.attribute.name.toLowerCase().replace(/\s+/g, "-");
    const slug = a.attribute.slug?.toLowerCase();
    return keys.includes(name) || keys.includes(slug);
  };

  const getUniqueAttributeValues = (keys) => {
    return [
      ...new Set(
        allAttributes
          .filter((a) => matchAttribute(a, keys))
          .flatMap((a) => a.values.map((v) => v.name))
      )
    ];
  };

  const colors = getUniqueAttributeValues(["color"]);
  const sizes = getUniqueAttributeValues(["size", "shoe-size"]);
  const materials = getUniqueAttributeValues(["material"]);

  const variantMap = p.variants.map((v) => {
    const attrMap = Object.fromEntries(
      v.attributes.map((a) => [a.attribute.slug, a.values[0]?.name])
    );

    return {
      id: v.id,
      price: v.pricing?.price?.gross?.amount ?? null,
      attributes: attrMap
    };
  });

  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    description: parseEditorJs(editorJson),
    images: p.media?.map((m) => m.url) || [],
    image: fixImageUrl(p.thumbnail?.url),
    categoryId: p.category?.id,
    colors,
    sizes,
    materials,
    variantMap,
    basePrice: p.pricing?.priceRange?.start?.gross?.amount,
    discount: null,
    rating: 4.5
  };
}


export async function fetchProductsByCategorySlug(slug, limit = 4) {
  const res = await fetch(saleorApiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query ProductsByCategory($slug: String!, $channel: String!, $limit: Int!) {
          category(slug: $slug) {
            id
            name
            products(first: $limit, channel: $channel) {
              edges {
                node {
                  id
                  name
                  slug
                  thumbnail {
                    url
                  }
                  pricing {
                    priceRange {
                      start {
                        gross {
                          amount
                          currency
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
      variables: { slug, channel: defaultChannel, limit }
    })
  });

  const json = await res.json();
  const category = json?.data?.category;

  if (!category) return { name: slug, products: [] };

  const products = category.products.edges.map((e) => ({
    id: e.node.id,
    name: e.node.name,
    slug: e.node.slug,
    image: fixImageUrl(e.node.thumbnail?.url),
    price: e.node.pricing?.priceRange?.start?.gross?.amount,
    discount: null,
    rating: 4.5
  }));

  return {
    name: category.name,
    products
  };
}

export async function fetchRelatedProducts(categoryId, limit = 20, excludeId, channel = defaultChannel) {
  const res = await fetch(saleorApiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query RelatedProducts($categoryId: ID!,$limit: Int!, $channel: String!) {
          products(
            filter: { categories: [$categoryId] }
            first: $limit
            channel: $channel
          ) {
            edges {
              node {
                id
                name
                slug
                thumbnail {
                  url
                }
                pricing {
                  priceRange {
                    start {
                      gross {
                        amount
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
        categoryId,
        limit,
        channel
      }
    })
  });

  const json = await res.json();
  const products = json?.data?.products?.edges.map((e) => e.node) || [];

  // Filter out the current product
  const filtered = products.filter((p) => p.id !== excludeId);

  return filtered.map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    image: item.thumbnail?.url.replace(/^https:\/\/https:\/\//, "https://"),
    price: item.pricing?.priceRange?.start?.gross?.amount,
    discount: null,
    rating: 4.5
  }));
}

export async function searchProducts(queryText, limit = 50) {
  const query = `
    query SearchProducts($query: String!, $channel: String!, $limit: Int!) {
      products(first: $limit, channel: $channel, filter: { search: $query }) {
        edges {
          node {
            id
            name
            slug
            thumbnail {
              url
            }
            pricing {
              priceRange {
                start {
                  gross {
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch(saleorApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query,
      variables: {
        query: queryText,
        channel: defaultChannel,
        limit
      }
    })
  });

  const json = await res.json();

  const nodes = json?.data?.products?.edges?.map((e) => e.node) || [];

  return nodes.map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    image: fixImageUrl(item.thumbnail?.url),
    price: item.pricing?.priceRange?.start?.gross?.amount,
    rating: 4.5
  }));
}
