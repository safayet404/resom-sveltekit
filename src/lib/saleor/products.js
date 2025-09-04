import { fixImageUrl } from "$lib/utils/fixImageUrl.js";
import { parseEditorJs } from "../../utils/parseEditorsJs.js";
import { saleorApiUrl, defaultChannel } from "./auth.js";
import { gql } from "graphql-request";

export async function fetchProducts(limit = 10, languageCode, after = null) {
  const response = await fetch(saleorApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: gql`
        query Products(
          $limit: Int!
          $channel: String!
          $languageCode: LanguageCodeEnum!
          $after: String
        ) {
          products(first: $limit, channel: $channel, after: $after) {
            pageInfo {
              endCursor
              hasNextPage
            }
            edges {
              node {
                id
                name
                slug
                translation(languageCode: $languageCode) {
                  name
                }
                thumbnail {
                  url
                }
                pricing {
                  onSale
                  discount {
                    gross {
                      amount
                      currency
                    }
                  }
                  priceRange {
                    start {
                      gross {
                        amount
                        currency
                      }
                    }
                  }
                  priceRangeUndiscounted {
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
      `,
      variables: {
        limit,
        channel: defaultChannel,
        languageCode: languageCode?.toUpperCase(),
        after,
      },
    }),
  });

  const json = await response.json();
  const nodes = json?.data?.products?.edges?.map((e) => e.node) || [];
  const pageInfo = json?.data?.products?.pageInfo || {};

  const product = nodes
    .filter((item) => item.pricing !== null)
    .map((item) => ({
      id: item.id,
      name: item?.translation?.name || item.name,
      slug: item.slug,
      image: fixImageUrl(item.thumbnail?.url),
      price: item.pricing?.priceRange?.start?.gross?.amount,
      originalPrice: item.pricing?.priceRangeUndiscounted?.start?.gross?.amount,
      discount: item.pricing?.discount?.gross?.amount || null,
      onSale: item.pricing?.onSale || false,
      rating: 4.5,
    }));

  return {
    product,
    pageInfo,
  };
}

export async function fetchProductsFromCollection(slug, limit = 10, languageCode, after = null) {
  const response = await fetch(saleorApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: gql`
        query ProductsFromCollection(
          $slug: String!
          $limit: Int!
          $channel: String!
          $languageCode: LanguageCodeEnum!
          $after: String
        ) {
          collection(slug: $slug, channel: $channel) {
            name
            products(first: $limit, after: $after) {
              pageInfo {
                endCursor
                hasNextPage
              }
              edges {
                node {
                  id
                  name
                  slug
                  translation(languageCode: $languageCode) {
                    name
                  }
                  thumbnail {
                    url
                  }
                  pricing {
                    onSale
                    discount {
                      gross {
                        amount
                        currency
                      }
                    }
                    priceRange {
                      start {
                        gross {
                          amount
                          currency
                        }
                      }
                    }
                    priceRangeUndiscounted {
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
      variables: {
        slug,
        limit,
        channel: defaultChannel,
        languageCode: languageCode?.toUpperCase(),
        after,
      },
    }),
  });

  const json = await response.json();
  const nodes = json?.data?.collection?.products?.edges?.map((e) => e.node) || [];
  const pageInfo = json?.data?.collection?.products?.pageInfo || {};

  const product = nodes
    .filter((item) => item.pricing !== null)
    .map((item) => ({
      id: item.id,
      name: item?.translation?.name || item.name,
      slug: item.slug,
      image: item.thumbnail?.url?.replace(/^https:\/\/https:\/\//, "https://"),
      price: item.pricing?.priceRange?.start?.gross?.amount,
      originalPrice: item.pricing?.priceRangeUndiscounted?.start?.gross?.amount,
      discount: item.pricing?.discount?.gross?.amount || null,
      onSale: item.pricing?.onSale || false,
      rating: 4.5,
    }));

  return {
    product,
    pageInfo,
  };
}

export async function fetchProductById(id, channel = defaultChannel) {
  const res = await fetch(saleorApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
              onSale
              discount {
                gross {
                  amount
                  currency
                }
              }
              priceRange {
                start {
                  gross {
                    amount
                    currency
                  }
                }
              }
              priceRangeUndiscounted {
                start {
                  gross {
                    amount
                    currency
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
              media{
        url
      }
              pricing {
                price {
                  gross {
                    amount
                  }
                }
                discount{
                gross{
                amount
                }
                }
                   priceUndiscounted{
          gross{
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
      variables: { id, channel },
    }),
  });

  const json = await res.json();
  const p = json?.data?.product;

  if (!p) return null;

  const editorJson = typeof p.description === "string" ? JSON.parse(p.description) : p.description;

  // Build variant map with all values per attribute
  const variantMap = p.variants.map((v) => {
    const attrMap = {};
    v.attributes.forEach((a) => {
      const key = a.attribute.slug.toLowerCase();
      const values = a.values?.map((val) => val.name).filter(Boolean) ?? [];
      if (key && values.length > 0) {
        attrMap[key] = values;
      }
    });

    return {
      id: v.id,
      price: v.pricing?.price?.gross?.amount ?? null,
      originalPrice: v.pricing?.priceUndiscounted?.gross?.amount ?? null,
      discount: v.pricing?.discount?.gross?.amount ?? null,
      media: v?.media?.map((m) => m.url) ?? null,
      attributes: attrMap,
    };
  });

  // Unique sizes (support both "size" and "shoe-size")
  const sizes = [
    ...new Set(
      variantMap
        .flatMap((v) => v.attributes.size ?? v.attributes["shoe-size"] ?? [])
        .filter(Boolean)
    ),
  ];

  // Colors available per size
  const colorsBySize = {};
  sizes.forEach((size) => {
    const matchingVariants = variantMap.filter(
      (v) =>
        (v.attributes.size && v.attributes.size.includes(size)) ||
        (v.attributes["shoe-size"] && v.attributes["shoe-size"].includes(size))
    );

    const allColors = matchingVariants.flatMap((v) => v.attributes.color || []);
    colorsBySize[size] = [...new Set(allColors)];
  });

  // console.log("check s", colorsBySize);

  // All unique colors
  const allColors = [
    ...new Set(variantMap.flatMap((v) => v.attributes.color || []).filter(Boolean)),
  ];

  // Optional: all materials
  const materials = [
    ...new Set(variantMap.flatMap((v) => v.attributes.material || []).filter(Boolean)),
  ];

  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    description: parseEditorJs(editorJson),
    images: p.media?.map((m) => m.url) || [],
    image: fixImageUrl(p.thumbnail?.url),
    categoryId: p.category?.id,
    sizes,
    colorsBySize, // ✅ colors grouped by selected size
    allColors, // ✅ all colors across all variants
    materials,
    variantMap, // ✅ detailed variant attribute map
    price: p.pricing?.priceRange?.start?.gross?.amount ?? null,
    originalPrice: p.pricing?.priceRangeUndiscounted?.start?.gross?.amount ?? null,
    discount: p.pricing?.discount?.gross?.amount ?? null,
    onSale: p.pricing?.onSale ?? false,
    rating: 4.5,
  };
}

export async function fetchProductsByCategorySlug(slug, limit = 10, languageCode, after = null) {
  const res = await fetch(saleorApiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: gql`
        query ProductsByCategory(
          $slug: String!
          $channel: String!
          $limit: Int!
          $languageCode: LanguageCodeEnum!
          $after: String
        ) {
          category(slug: $slug) {
            id
            name
            products(first: $limit, channel: $channel, after: $after) {
              pageInfo {
                endCursor
                hasNextPage
              }
              edges {
                node {
                  id
                  name
                  slug
                  translation(languageCode: $languageCode) {
                    name
                  }
                  thumbnail {
                    url
                  }
                  pricing {
                    onSale
                    discount {
                      gross {
                        amount
                        currency
                      }
                    }
                    priceRange {
                      start {
                        gross {
                          amount
                          currency
                        }
                      }
                    }
                    priceRangeUndiscounted {
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
      variables: {
        slug,
        channel: defaultChannel,
        limit,
        languageCode: languageCode?.toUpperCase(),
        after,
      },
    }),
  });

  const json = await res.json();
  const category = json?.data?.category;
  const nodes = json?.data?.category?.products?.edges?.map((e) => e.node) || [];
  const pageInfo = json?.data?.category?.products?.pageInfo || {};

  if (!category) return { name: slug, products: [] };

  const product = nodes
    .filter((item) => item.pricing !== null)
    .map((item) => ({
      id: item.id,
      name: item?.translation?.name || item.name,
      slug: item.slug,
      image: fixImageUrl(item.thumbnail?.url),
      price: item.pricing?.priceRange?.start?.gross?.amount,
      originalPrice: item.pricing?.priceRangeUndiscounted?.start?.gross?.amount,
      discount: item.pricing?.discount?.gross?.amount || null,
      onSale: item.pricing?.onSale || false,
      rating: 4.5,
    }));

  return {
    product,
    pageInfo,
  };
}

export async function fetchRelatedProducts(
  categoryId,
  limit = 20,
  excludeId,
  channel = defaultChannel
) {
  const res = await fetch(saleorApiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: gql`
        query RelatedProducts($categoryId: ID!, $limit: Int!, $channel: String!) {
          products(filter: { categories: [$categoryId] }, first: $limit, channel: $channel) {
            pageInfo {
              endCursor
              hasNextPage
            }
            edges {
              node {
                id
                name
                slug
                thumbnail {
                  url
                }
                pricing {
                  onSale
                  discount {
                    gross {
                      amount
                      currency
                    }
                  }
                  priceRange {
                    start {
                      gross {
                        amount
                      }
                    }
                  }
                  priceRangeUndiscounted {
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
      `,
      variables: {
        categoryId,
        limit,
        channel,
      },
    }),
  });

  const json = await res.json();
  const products = json?.data?.products?.edges.map((e) => e.node) || [];
  const pageInfo = json?.data?.products?.pageInfo || {};
  const filtered = products.filter((p) => p.id !== excludeId);

  const product = filtered.map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    image: item.thumbnail?.url.replace(/^https:\/\/https:\/\//, "https://"),
    price: item.pricing?.priceRange?.start?.gross?.amount,
    originalPrice: item.pricing?.priceRangeUndiscounted?.start?.gross?.amount,
    discount: item.pricing?.discount?.gross?.amount || null,
    onSale: item.pricing?.onSale || false,
    discount: null,
    rating: 4.5,
  }));

  return {
    product,
    pageInfo,
  };
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
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        query: queryText,
        channel: defaultChannel,
        limit,
      },
    }),
  });

  const json = await res.json();

  const nodes = json?.data?.products?.edges?.map((e) => e.node) || [];

  return nodes.map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    image: fixImageUrl(item.thumbnail?.url),
    price: item.pricing?.priceRange?.start?.gross?.amount,
    rating: 4.5,
  }));
}

// src/lib/saleor/products.js
export async function checkSearchProduct(query, offset = 0, limit = 20, page = 1) {
  const res = await fetch("https://micro-service.resom.com.br/api/v1/search/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uid: "resom_products",
      query,
      offset,
      limit,
      page,
    }),
  });

  if (!res.ok) {
    throw new Error(`Search failed: ${res.statusText}`);
  }

  const data = await res.json();
  return data;
}
