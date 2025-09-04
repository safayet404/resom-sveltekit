import { PUBLIC_API_URL } from "$env/static/public";

// src/lib/api/saleor.js
export async function createCheckout(email, lines, channel) {
    const query = `
      mutation CheckoutCreate($email: String!, $lines: [CheckoutLineInput!]!, $channel: String!) {
        checkoutCreate(input: {email: $email, lines: $lines, channel: $channel}) {
          checkout {
            id
            token
            lines {
              quantity
              variant {
                id
              }
            }
          }
          errors {
            field
            message
          }
        }
      }
    `;

    const res = await fetch(PUBLIC_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables: {
                email,
                lines,
                channel
            }
        })
    });

    const json = await res.json();
    return json.data.checkoutCreate;
}
