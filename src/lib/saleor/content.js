// query GetAboutPage {
//   page(slug: "about-us") { # Assuming your "About" model has a slug field
//     id
//     title
//     content # This would be the rich text content you entered
//     seoTitle
//     seoDescription
//     # ... other fields you defined in your model
//   }
// }
const gql = (strings) => strings.join("");
import { saleorApiUrl } from "./auth";

export async function fetchAbout(slug) {
  const res = await fetch(saleorApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      query: gql`
        query GetAboutPage($slug: String!) {
          page(slug: $slug) {
            id
            title
            content
            seoTitle
            seoDescription
          }
        }
      `,
      variables: {
        slug: slug,
      },
    }),
  });

  const json = await res.json();

  return json?.data?.page;
}
