// src/lib/saleor/address.js
import { gql, request } from 'graphql-request';
import { saleorApiUrl } from '$lib/saleor/auth';

const CREATE_ADDRESS = gql`
  mutation CreateAddress($input: AddressInput!) {
    accountAddressCreate(input: $input) {
      address {
        id
        city
        postalCode
      }
      userErrors {
        message
      }
    }
  }
`;

const SET_DEFAULT_ADDRESS = gql`
  mutation SetDefaultAddress($id: ID!, $type: AddressTypeEnum!) {
    accountSetDefaultAddress(id: $id, type: $type) {
      userErrors {
        message
      }
    }
  }
`;

export async function createUserAddress(token, formValues) {
    const input = {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        companyName: '',
        streetAddress1: formValues.street,
        streetAddress2: `${formValues.apartment}, ${formValues.block}, ${formValues.complement}`,
        city: formValues.city,
        postalCode: formValues.postalCode,
        country: formValues.selectedCountry,
        phone: `${formValues.callingCountry.callingCode} ${formValues.phoneNumber}`
    };

    const headers = {
        Authorization: `Bearer ${token}`
    };

    const addressRes = await request(saleorApiUrl, CREATE_ADDRESS, { input }, headers);

    const addressId = addressRes?.accountAddressCreate?.address?.id;

    if (!addressId) {
        return {
            error: addressRes.accountAddressCreate?.userErrors?.[0]?.message || 'Failed to create address.'
        };
    }

    // Optional: set it as default billing and shipping
    await request(saleorApiUrl, SET_DEFAULT_ADDRESS, { id: addressId, type: 'BILLING' }, headers);
    await request(saleorApiUrl, SET_DEFAULT_ADDRESS, { id: addressId, type: 'SHIPPING' }, headers);

    return { success: true };
}
