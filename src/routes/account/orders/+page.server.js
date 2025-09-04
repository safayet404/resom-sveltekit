// +page.server.js
import { PUBLIC_API_URL } from '$env/static/public';

export async function load({ cookies }) {
    const token = cookies.get("authToken");

    console.log("token", token);


    const res = await fetch(PUBLIC_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            query: `
        query Orders {
           me {
    orders(last: 10) {
      edges {
        node {
          id
          number
          created
          status
          total {
            gross {
              amount
              currency
            }
          }
          lines {
            productName
            quantity
            unitPrice {
              gross {
                amount
                currency
              }
            }
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
    const orders = json?.data?.me?.orders?.edges?.map(edge => edge.node) || [];

    return { orders };
}
