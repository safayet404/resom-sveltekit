import { PUBLIC_API_URL } from "$env/static/public";
import { gql } from "graphql-request";

const SALEOR_ENDPOINT = PUBLIC_API_URL;
const GRAPHQL_URL = PUBLIC_API_URL;

async function fetchSaleor(query, variables, token = null) {
  // Add token parameter
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`; // Add Authorization header if token is provided
  }

  const res = await fetch(SALEOR_ENDPOINT, {
    method: "POST",
    headers: headers, // Use the headers object
    body: JSON.stringify({ query, variables }),
  });
  const { data, errors } = await res.json();
  if (errors) throw new Error(errors.map((e) => e.message).join(", "));
  return data;
}

// Seperate

const CREATE_CHECKOUT_MUTATION = `
  mutation CheckoutCreate($email: String!, $lines: [CheckoutLineInput!]!, $channel: String!) {
    checkoutCreate(input: {
      email: $email,
      lines: $lines,
      channel: $channel
    }) {
      checkout {
        id
        token
        email
        totalPrice {
          gross {
            amount
            currency
          }
        }
        subtotalPrice {
          gross {
            amount
            currency
          }
        }
        shippingPrice {
          gross {
            amount
            currency
          }
        }
        discount {
          amount
          currency
        }
        discountName
        voucherCode
        lines {
          id
          quantity
          variant {
            id
            name
          }
        }
      }
      errors {
        field
        message
        code
      }
    }
  }
`;

const GET_CHECKOUT_QUERY = `
  query GetCheckout($token: UUID!) {
    checkout(token: $token) {
      id
      token
      email
      totalPrice {
        gross {
          amount
          currency
        }
      }
      subtotalPrice {
        gross {
          amount
          currency
        }
      }
      shippingPrice {
        gross {
          amount
          currency
        }
      }
      discount {
        amount
        currency
      }
      discountName
      voucherCode
      lines {
        id
        quantity
        variant {
          id
          name
          product {
            name
          }
        }
      }
    }
  }
`;

const UPDATE_CHECKOUT_LINES_MUTATION = `
  mutation CheckoutLinesUpdate($token: UUID!, $lines: [CheckoutLineUpdateInput!]!) {
    checkoutLinesUpdate(token: $token, lines: $lines) {
      checkout {
        id
        token
        totalPrice {
          gross {
            amount
            currency
          }
        }
        subtotalPrice {
          gross {
            amount
            currency
          }
        }
        shippingPrice {
          gross {
            amount
            currency
          }
        }
        discount {
          amount
          currency
        }
        discountName
        voucherCode
        lines {
          id
          quantity
          variant {
            id
          }
        }
      }
      errors {
        field
        message
        code
      }
    }
  }
`;

const APPLY_VOUCHER_MUTATION = `
  mutation CheckoutAddPromoCode($checkoutId: ID!, $promoCode: String!) {
    checkoutAddPromoCode(checkoutId: $checkoutId, promoCode: $promoCode) {
      checkout {
        id
        token
        totalPrice {
          gross {
            amount
            currency
          }
        }
        subtotalPrice {
          gross {
            amount
            currency
          }
        }
        shippingPrice {
          gross {
            amount
            currency
          }
        }
        discount {
          amount
          currency
        }
        discountName
        voucherCode
      }
      errors {
        field
        message
        code
      }
    }
  }
`;

const REMOVE_VOUCHER_MUTATION = `
  mutation CheckoutRemovePromoCode($checkoutId: ID!, $promoCode: String!) {
    checkoutRemovePromoCode(checkoutId: $checkoutId, promoCode: $promoCode) {
      checkout {
        id
        token
        totalPrice {
          gross {
            amount
            currency
          }
        }
        subtotalPrice {
          gross {
            amount
            currency
          }
        }
        shippingPrice {
          gross {
            amount
            currency
          }
        }
        discount {
          amount
          currency
        }
        discountName
        voucherCode
      }
      errors {
        field
        message
        code
      }
    }
  }
`;

async function graphqlRequest(query, variables = {}) {
  try {
    const response = await fetch(GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) {
      console.error("GraphQL errors:", result.errors);
      throw new Error(result.errors[0]?.message || "GraphQL error occurred");
    }

    return result.data;
  } catch (error) {
    console.error("GraphQL request failed:", error);
    throw error;
  }
}

export async function createCheckout(email, lines, channel) {
  try {
    const variables = {
      email,
      lines,
      channel,
    };

    const data = await graphqlRequest(CREATE_CHECKOUT_MUTATION, variables);
    return data.checkoutCreate;
  } catch (error) {
    console.error("Create checkout failed:", error);
    throw error;
  }
}

// export async function createCheckout(email, lines, channel) {
//   try {
//     const variables = {
//       email,
//       lines,
//       channel,
//     };

//     const data = await graphqlRequest(CREATE_CHECKOUT_MUTATION, variables);
//     const checkoutResult = data.checkoutCreate;

//     // Apply order promotions after creation
//     if (checkoutResult.checkout && checkoutResult.checkout.token) {
//       const promotionResult = await applyOrderPromotions(checkoutResult.checkout.token);
//       return promotionResult.checkout ? promotionResult : checkoutResult;
//     }

//     return checkoutResult;
//   } catch (error) {
//     console.error("Create checkout failed:", error);
//     throw error;
//   }
// }

// Get checkout details by token
export async function getCheckoutDetails(token) {
  try {
    const data = await graphqlRequest(GET_CHECKOUT_QUERY, { token });
    return data.checkout;
  } catch (error) {
    console.error("Get checkout details failed:", error);
    return null; // Return null instead of throwing to handle gracefully
  }
}

export async function updateCheckoutLines(token, lines) {
  try {
    const updateLines = lines.map((line) => ({
      variantId: line.variantId,
      quantity: line.quantity,
    }));

    const variables = {
      token,
      lines: updateLines,
    };

    const data = await graphqlRequest(UPDATE_CHECKOUT_LINES_MUTATION, variables);
    return data.checkoutLinesUpdate;
  } catch (error) {
    console.error("Update checkout lines failed:", error);
    throw error;
  }
}

export async function applyVoucherToCheckout(checkoutId, promoCode) {
  try {
    const variables = {
      checkoutId,
      promoCode,
    };

    const data = await graphqlRequest(APPLY_VOUCHER_MUTATION, variables);
    return data.checkoutAddPromoCode;
  } catch (error) {
    console.error("Apply voucher failed:", error);
    throw error;
  }
}

export async function removeVoucherFromCheckout(checkoutId, promoCode) {
  try {
    const variables = {
      checkoutId,
      promoCode,
    };

    const data = await graphqlRequest(REMOVE_VOUCHER_MUTATION, variables);
    return data.checkoutRemovePromoCode;
  } catch (error) {
    console.error("Remove voucher failed:", error);
    throw error;
  }
}

export async function applyVoucherByToken(token, promoCode) {
  try {
    const checkout = await getCheckoutDetails(token);
    if (!checkout) {
      throw new Error("Checkout not found");
    }

    return await applyVoucherToCheckout(checkout.id, promoCode);
  } catch (error) {
    console.error("Apply voucher by token failed:", error);
    throw error;
  }
}

export async function removeVoucherByToken(token, promoCode) {
  try {
    const checkout = await getCheckoutDetails(token);
    if (!checkout) {
      throw new Error("Checkout not found");
    }

    return await removeVoucherFromCheckout(checkout.id, promoCode);
  } catch (error) {
    console.error("Remove voucher by token failed:", error);
    throw error;
  }
}

export async function updateShippingAddress(token, address) {
  const query = `mutation CheckoutShippingAddressUpdate($token: UUID!, $address: AddressInput!) {
    checkoutShippingAddressUpdate(token: $token, shippingAddress: $address) {
      checkout {
        id
        shippingAddress {
          firstName lastName streetAddress1 city postalCode country { code } phone
        }
      }
      errors { field message }
    }
  }`;
  return fetchSaleor(query, { token, address });
}

export async function updateBillingAddress(token, address) {
  const query = `mutation CheckoutBillingAddressUpdate($token: UUID!, $address: AddressInput!) {
    checkoutBillingAddressUpdate(token: $token, billingAddress: $address) {
      checkout {
        id
        billingAddress {
          firstName lastName streetAddress1 city postalCode country { code } phone
        }
      }
      errors { field message }
    }
  }`;
  return fetchSaleor(query, { token, address });
}

export async function getShippingMethods(token) {
  const query = `query CheckoutAvailableShippingMethods($token: UUID!) {
    checkout(token: $token) {
      availableShippingMethods {
        id name price { amount currency }
      }
    }
  }`;
  return fetchSaleor(query, { token });
}

export async function setShippingMethod(token, shippingMethodId) {
  const query = `mutation CheckoutDeliveryMethodUpdate($token: UUID!, $deliveryMethodId: ID!) {
    checkoutDeliveryMethodUpdate(token: $token, deliveryMethodId: $deliveryMethodId) {
      checkout {
        id
        shippingMethod {
          id
          name
          price { amount currency }
        }
      }
      errors { field message }
    }
  }`;
  return fetchSaleor(query, { token, deliveryMethodId: shippingMethodId });
}

export async function addPayment(token, amount, gateway = "mirumee.payments.dummy") {
  const query = `
    mutation CheckoutPaymentCreate($token: UUID!, $input: PaymentInput!) {
        checkoutPaymentCreate(token: $token, input: $input) {
            payment {
                id
            }
            errors {
                field
                message
            }
        }
    }`;

  const input = {
    amount,
    gateway,
    token: "not-needed",
  };

  return fetchSaleor(query, { token, input });
}

export async function completeCheckout(token) {
  const query = `mutation CheckoutComplete($token: UUID!) {
    checkoutComplete(token: $token) {
      order { id number status }
      errors { field message }
    }
  }`;
  return fetchSaleor(query, { token });
}

export async function getCheckoutTotal(token) {
  const query = `
    query GetCheckoutTotal($token: UUID!) {
        checkout(token: $token) {
            totalPrice {
                gross {
                    amount
                    currency
                }
            }
        }
    }`;
  const res = await fetchSaleor(query, { token });
  return res.checkout.totalPrice.gross.amount;
}

const promotions = gql`
  query GetPromotions {
    promotions(first: 20) {
      edges {
        node {
          id
          name

          startDate
          endDate

          type
          rules {
            id
            name
            description
            rewardValue
            rewardType
            cataloguePredicate
            orderPredicate
          }
        }
      }
    }
  }
`;

export async function getPromotions() {
  try {
    const data = await graphqlRequest(promotions);
    console.log("promo", data);
  } catch (error) {
    console.error("Remove voucher failed:", error);
    throw error;
  }
}
