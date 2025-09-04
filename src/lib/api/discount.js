// $lib/api/saleor.js

import { SALEOR_GRAPHQL_URL } from "$env/static/private";
import { PUBLIC_SALEOR_GRAPHQL_URL } from "$env/static/public";

const GRAPHQL_URL = SALEOR_GRAPHQL_URL || PUBLIC_SALEOR_GRAPHQL_URL;

// GraphQL Queries and Mutations
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

// Helper function to make GraphQL requests
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

// Create a new checkout
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

// Update checkout lines (quantities, add/remove items)
export async function updateCheckoutLines(token, lines) {
  try {
    // Transform lines to the format expected by Saleor
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

// Apply voucher to checkout
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

// Remove voucher from checkout
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

// Alternative function using checkout token instead of ID for voucher operations
export async function applyVoucherByToken(token, promoCode) {
  try {
    // First get the checkout to obtain the ID
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
    // First get the checkout to obtain the ID
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

// Additional checkout mutations for address and shipping

const UPDATE_BILLING_ADDRESS_MUTATION = `
  mutation CheckoutBillingAddressUpdate($token: UUID!, $billingAddress: AddressInput!) {
    checkoutBillingAddressUpdate(token: $token, billingAddress: $billingAddress) {
      checkout {
        id
        token
        billingAddress {
          id
          firstName
          lastName
          companyName
          streetAddress1
          streetAddress2
          city
          cityArea
          postalCode
          country {
            code
          }
          countryArea
          phone
        }
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
      }
      errors {
        field
        message
        code
      }
    }
  }
`;

const UPDATE_SHIPPING_ADDRESS_MUTATION = `
  mutation CheckoutShippingAddressUpdate($token: UUID!, $shippingAddress: AddressInput!) {
    checkoutShippingAddressUpdate(token: $token, shippingAddress: $shippingAddress) {
      checkout {
        id
        token
        shippingAddress {
          id
          firstName
          lastName
          companyName
          streetAddress1
          streetAddress2
          city
          cityArea
          postalCode
          country {
            code
          }
          countryArea
          phone
        }
        availableShippingMethods {
          id
          name
          price {
            amount
            currency
          }
        }
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
      }
      errors {
        field
        message
        code
      }
    }
  }
`;

const UPDATE_DELIVERY_METHOD_MUTATION = `
  mutation CheckoutDeliveryMethodUpdate($token: UUID!, $deliveryMethodId: ID!) {
    checkoutDeliveryMethodUpdate(token: $token, deliveryMethodId: $deliveryMethodId) {
      checkout {
        id
        token
        shippingMethod {
          id
          name
          price {
            amount
            currency
          }
        }
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
      }
      errors {
        field
        message
        code
      }
    }
  }
`;

const COMPLETE_CHECKOUT_MUTATION = `
  mutation CheckoutComplete($token: UUID!) {
    checkoutComplete(token: $token) {
      order {
        id
        number
        status
        totalGross {
          amount
          currency
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

const GET_CHECKOUT_WITH_ADDRESSES_QUERY = `
  query GetCheckoutWithAddresses($token: UUID!) {
    checkout(token: $token) {
      id
      token
      email
      billingAddress {
        id
        firstName
        lastName
        companyName
        streetAddress1
        streetAddress2
        city
        cityArea
        postalCode
        country {
          code
        }
        countryArea
        phone
      }
      shippingAddress {
        id
        firstName
        lastName
        companyName
        streetAddress1
        streetAddress2
        city
        cityArea
        postalCode
        country {
          code
        }
        countryArea
        phone
      }
      availableShippingMethods {
        id
        name
        price {
          amount
          currency
        }
        maximumDeliveryDays
        minimumDeliveryDays
        description
      }
      shippingMethod {
        id
        name
        price {
          amount
          currency
        }
        maximumDeliveryDays
        minimumDeliveryDays
        description
      }
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
            thumbnail {
              url
            }
          }
        }
        totalPrice {
          gross {
            amount
            currency
          }
        }
      }
    }
  }
`;

const GET_SHIPPING_METHODS_QUERY = `
  query GetShippingMethods($token: UUID!) {
    checkout(token: $token) {
      id
      availableShippingMethods {
        id
        name
        price {
          amount
          currency
        }
        maximumDeliveryDays
        minimumDeliveryDays
        description
      }
      shippingMethod {
        id
        name
        price {
          amount
          currency
        }
        maximumDeliveryDays
        minimumDeliveryDays
        description
      }
    }
  }
`;

// Update billing address
export async function updateBillingAddress(token, billingAddress) {
  try {
    const variables = {
      token,
      billingAddress,
    };

    const data = await graphqlRequest(UPDATE_BILLING_ADDRESS_MUTATION, variables);
    return data.checkoutBillingAddressUpdate;
  } catch (error) {
    console.error("Update billing address failed:", error);
    throw error;
  }
}

// Update shipping address
export async function updateShippingAddress(token, shippingAddress) {
  try {
    const variables = {
      token,
      shippingAddress,
    };

    const data = await graphqlRequest(UPDATE_SHIPPING_ADDRESS_MUTATION, variables);
    return data.checkoutShippingAddressUpdate;
  } catch (error) {
    console.error("Update shipping address failed:", error);
    throw error;
  }
}

// Update delivery method (shipping method)
export async function updateDeliveryMethod(token, deliveryMethodId) {
  try {
    const variables = {
      token,
      deliveryMethodId,
    };

    const data = await graphqlRequest(UPDATE_DELIVERY_METHOD_MUTATION, variables);
    return data.checkoutDeliveryMethodUpdate;
  } catch (error) {
    console.error("Update delivery method failed:", error);
    throw error;
  }
}

// Alternative function name for updating shipping method
export async function updateShippingMethod(token, shippingMethodId) {
  return await updateDeliveryMethod(token, shippingMethodId);
}

// Another alias for consistency with component naming
export async function setShippingMethod(token, shippingMethodId) {
  return await updateDeliveryMethod(token, shippingMethodId);
}

// Get available payment gateways
export async function getPaymentGateways(token) {
  try {
    const GET_PAYMENT_GATEWAYS_QUERY = `
      query GetPaymentGateways($token: UUID!) {
        checkout(token: $token) {
          availablePaymentGateways {
            id
            name
            config {
              field
              value
            }
            currencies
          }
        }
      }
    `;

    const data = await graphqlRequest(GET_PAYMENT_GATEWAYS_QUERY, { token });
    return data.checkout?.availablePaymentGateways || [];
  } catch (error) {
    console.error("Get payment gateways failed:", error);
    return [];
  }
}

// Create payment for checkout
export async function createPayment(token, gateway, amount, currency = "USD") {
  try {
    const CREATE_PAYMENT_MUTATION = `
      mutation PaymentCheckoutCreate($checkoutToken: UUID!, $payment: PaymentInput!) {
        checkoutPaymentCreate(token: $checkoutToken, input: $payment) {
          payment {
            id
            gateway
            isActive
            created
            modified
            token
            checkout {
              id
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

    const variables = {
      checkoutToken: token,
      payment: {
        gateway,
        amount,
        currency,
      },
    };

    const data = await graphqlRequest(CREATE_PAYMENT_MUTATION, variables);
    return data.checkoutPaymentCreate;
  } catch (error) {
    console.error("Create payment failed:", error);
    throw error;
  }
}

// Get checkout with full address and shipping information
export async function getCheckoutWithAddresses(token) {
  try {
    const data = await graphqlRequest(GET_CHECKOUT_WITH_ADDRESSES_QUERY, { token });
    return data.checkout;
  } catch (error) {
    console.error("Get checkout with addresses failed:", error);
    return null;
  }
}

// Get available shipping methods for checkout
export async function getShippingMethods(token) {
  try {
    const data = await graphqlRequest(GET_SHIPPING_METHODS_QUERY, { token });
    return data.checkout?.availableShippingMethods || [];
  } catch (error) {
    console.error("Get shipping methods failed:", error);
    return [];
  }
}

// Get checkout with shipping methods (alternative function)
export async function getCheckoutShipping(token) {
  try {
    const data = await graphqlRequest(GET_SHIPPING_METHODS_QUERY, { token });
    return data.checkout;
  } catch (error) {
    console.error("Get checkout shipping failed:", error);
    return null;
  }
}

// Complete checkout (create order)
export async function completeCheckout(token) {
  try {
    const variables = { token };
    const data = await graphqlRequest(COMPLETE_CHECKOUT_MUTATION, variables);
    return data.checkoutComplete;
  } catch (error) {
    console.error("Complete checkout failed:", error);
    throw error;
  }
}

// Helper function to validate address format
export function validateAddress(address) {
  const requiredFields = [
    "firstName",
    "lastName",
    "streetAddress1",
    "city",
    "postalCode",
    "country",
  ];
  const missingFields = requiredFields.filter((field) => !address[field]);

  if (missingFields.length > 0) {
    throw new Error(`Missing required address fields: ${missingFields.join(", ")}`);
  }

  return true;
}

// Helper function to format address for Saleor
export function formatAddressForSaleor(address) {
  // Clean and format phone number
  let formattedPhone = address.phone || "";
  if (formattedPhone && !formattedPhone.startsWith("+")) {
    // If phone doesn't start with +, assume it needs country code
    if (formattedPhone.match(/^\d/)) {
      formattedPhone = "+" + formattedPhone;
    }
  }

  return {
    firstName: (address.firstName || "").trim(),
    lastName: (address.lastName || "").trim(),
    companyName: (address.companyName || "").trim(),
    streetAddress1: (address.streetAddress1 || "").trim(),
    streetAddress2: (address.streetAddress2 || "").trim(),
    city: (address.city || "").trim(),
    cityArea: (address.cityArea || "").trim(),
    postalCode: (address.postalCode || "").trim(),
    country: (address.country || "").trim().toUpperCase(),
    countryArea: (address.countryArea || "").trim(),
    phone: formattedPhone.trim(),
  };
}
